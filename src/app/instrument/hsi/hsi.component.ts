import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-hsi',
  templateUrl: './hsi.component.html',
  styleUrls: ['./hsi.component.css']
})
export class HsiComponent implements OnInit, AfterViewInit  {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private heading: number = 0;
  private headingbug: number = 0;
  private obs: number = 0;
  private cdi: number = 0;
  private bearingOff: number = 0;
  private gsOff: number = 0;

  constructor(private fgService: FgService) {
      this.fgService.setDebugValue("/instrumentation/heading-indicator/indicated-heading-deg", 180, 0, 359);
      this.fgService.setDebugValue("/instrumentation/hsi/inputs/hsi-loc-deflection", 4, 2, 6);
      this.fgService.setDebugValue("/instrumentation/hsi/inputs/hsi-gs-deflection", 0, -1.2, 1.2);
      this.fgService.setDebugValue("/instrumentation/hsi/inputs/radials/selected-deg", 180, 180, 180);
      this.fgService.setDebugValue("/autopilot/settings/heading-bug-deg", 180, 180, 180);
  }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 300);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/hsi-card.gif", "hsi-card", -1, 10);
          this.instrument.addBackgroundImage("assets/hsi.gif", "hsi", 0, 0);
          this.instrument.addBackgroundImage("assets/hsi-hdgbug.gif", "hsi-hdgbug", 1, 10);
          this.instrument.addBackgroundImage("assets/hsi-obs.gif", "hsi-obs", 2, 10);
          this.instrument.addBackgroundImage("assets/hsi-gs.gif", "hsi-gs", 3, 10);
          this.instrument.addBackgroundImage("assets/hsi-cdi-needle.gif", "hsi-cdi-needle", 4, 10);
          this.instrument.addBackgroundImage("assets/hsi-glass.gif", "hsi-glass", 5, 10);
  }

  getData() {
          this.heading = Number(this.getProperty("/instrumentation/heading-indicator/indicated-heading-deg"));
          this.obs = Number(this.getProperty("/instrumentation/hsi/inputs/radials/selected-deg"));
          this.headingbug = Number(this.getProperty("/autopilot/settings/heading-bug-deg"));
          this.bearingOff =  -Number(this.getProperty("/instrumentation/hsi/inputs/hsi-loc-deflection"));
          this.gsOff = -Number(this.getProperty("/instrumentation/hsi/inputs/hsi-gs-deflection"));
          if (isNaN(this.heading)) {
                  this.heading = 0;
          }
          if (isNaN(this.headingbug)) {
                  this.headingbug = 0;
          }
          if (isNaN(this.obs)) {
                  this.obs = 0;
          }
          if (isNaN(this.bearingOff)) {
                  this.bearingOff = 0;
          }
          if (isNaN(this.gsOff)) {
                  this.gsOff = 0;
          }
          this.setSpeed(this.heading, this.headingbug, this.obs, this.bearingOff, this.gsOff);
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  setSpeed(hdg: number, bug: number, obs: number, bearingOff: number, gsOff: number) {
        this.instrument.rotatePart('hsi-card', -hdg );
        this.instrument.rotatePart('hsi-hdgbug', bug - hdg );
        this.instrument.rotatePart('hsi-obs', obs - hdg );
        this.instrument.rotatePart('hsi-cdi-needle', obs - hdg );
        this.instrument.shiftLeft('hsi-cdi-needle', bearingOff * 5);
        this.instrument.shiftUp('hsi-gs', gsOff * 15);
  }


}
