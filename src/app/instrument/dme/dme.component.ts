import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-dme',
  templateUrl: './dme.component.html',
  styleUrls: ['./dme.component.css']
})
export class DmeComponent implements OnInit, AfterViewInit  {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private nm: number = 9.2;
  private kts: number = 130;
  private min: number = 9;

  constructor(private fgService: FgService) { }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 300);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/dme.gif", "dme-card", 0, 0);
  }

  getData() {
          this.nm = Math.abs(Number(this.getProperty("instrumentation/dme/indicated-distance-nm")));
          if (isNaN(this.nm)) {
                  this.nm = 0;
          }
          this.kts = Math.abs(Number(this.getProperty("instrumentation/dme/indicated-ground-speed-kt")));
          if (isNaN(this.kts)) {
                  this.kts = 0;
          }
          this.min = Math.abs(Number(this.getProperty("instrumentation/dme/indicated-time-min")));
          if (isNaN(this.min)) {
                  this.min = 0;
          }
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

}
