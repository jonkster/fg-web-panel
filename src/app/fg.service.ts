import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttle';



@Injectable()
export class FgService implements OnInit {

  private tree: any = {};
  private knownPaths: { [key: string]: any } = {};
  private fgHost = "192.168.0.30";

  constructor(private http: Http) {
        let siht = this;
        setInterval(() => {
                let paths = Object.keys(siht.knownPaths);
                for (let i = 0; i < paths.length; i++) {
                        siht.getProperty(paths[i], this);
                } },100);
  }

  ngOnInit() {
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
        
  }

  setProperty(path: string, item: string, value: string) {
        let obj = this.knownPaths[path + '/' + item];
        if (obj !== undefined) {
                obj.value = value;
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



}
