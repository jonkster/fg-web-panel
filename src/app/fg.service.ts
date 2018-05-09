import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttle';



@Injectable()
export class FgService implements OnInit {

  private tree: any = {};
  private knownPaths: { [key: string]: any } = {};
  private debugDefaults: { [key: string]: any } = {};
  private fgHost = "192.168.0.30";
  private fgDetected: boolean = false;

  constructor(private http: Http) {
        
        let siht = this;
        setInterval(() => {
                let paths = Object.keys(siht.knownPaths);
                for (let i = 0; i < paths.length; i++) {
                        siht.getProperty(paths[i], this);
                } },100);
        setInterval(() => {
                siht.detectFg();
        }, 3000);
  }

  detectFg() {
        this.http.get('http://' + this.fgHost + ':5500/json/')
                .map((response) => response.json())
                .subscribe(
                          data => {
                              this.fgDetected = true;
                          },
                          error => {
                                this.fgDetected = false;
                                  console.log('error', error);
                          }
                    );
  }

  ngOnInit() {
  } 

  getStatus(): string {
      if (this.fgDetected) {
          return "OK - FG Sim detected";
      } else {
          return "*DEBUG MODE* - FG Sim NOT detected";
      }
  }

  getValue(path: string) {
        if (this.knownPaths[path] === undefined) {
                this.knownPaths[path] = {};
                this.getProperty(path, this);
        }
        let v = this.tree[path];
        return v;
  }

  getProperty(path: string, siht: any) {
      if (siht.fgDetected) {
          siht.http.get('http://' + this.fgHost + ':5500/json/' + path)
              .map((response) => response.json())
              .subscribe(
                  data => {
                      siht.tree[path] = data.value;
                      siht.knownPaths[path] = data;
                  },
                  error => {
                      console.log('error', error);
                  }
              );
      } else {
          let v = 10;
          if (siht.debugDefaults[path] !== undefined) {
              v = siht.debugDefaults[path].value;
              if (siht.debugDefaults[path].min !== siht.debugDefaults[path].max) {
                  siht.debugDefaults[path].value += 1 - 2*Math.random();
                  if ((v > siht.debugDefaults[path].max) ||   (v < siht.debugDefaults[path].min)) {
                      v = siht.debugDefaults[path].min + (siht.debugDefaults[path].max - siht.debugDefaults[path].min) / 2;
                      siht.debugDefaults[path].value = v;
                  }
              }
          }
          siht.tree[path] = v;
          this.knownPaths[path] = { 'value': v };
      }
  }

  setProperty(path: string, item: string, value: string) {
      let p = path + '/' + item;
      p = p.replace('//', '/');
      let obj = this.knownPaths[p];
      if (obj !== undefined) {
          obj.value = value;
          if (this.fgDetected) {
              this.http.post('http://' + this.fgHost + ':5500/json/' + path, obj)
                  .subscribe(
                      data => {
                      },
                      error => {
                          console.log('put error', error);
                      }
                  );
          }
      }
      if (! this.fgDetected) {
          this.tree[p] = value;
          this.knownPaths[p] = { 'value': value };
          this.debugDefaults[p].value = value;
      }
  }

  setDebugValue(path: string, value, min, max: number) {
      this.debugDefaults[path] = {
          value: value,
          min: min,
          max: max
      }
  }

}
