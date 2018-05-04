import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-altimeter',
  templateUrl: './altimeter.component.html',
  styleUrls: ['./altimeter.component.css']
})
export class AltimeterComponent implements OnInit, AfterViewInit  {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private altitude: number = 0;

  constructor(private fgService: FgService) {
      this.fgService.setDebugValue("/position/altitude-ft", 3300, 3000, 4000);
  }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 300);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/altimeter.gif", "altimeter", 0, 0);
          this.instrument.addBackgroundImage("assets/altimeter-10000.gif", "altimeter-10000", 1, 0);
          this.instrument.addBackgroundImage("assets/altimeter-1000.gif", "altimeter-1000", 2, 0);
          this.instrument.addBackgroundImage("assets/altimeter-100.gif", "altimeter-100", 3, 0);
          this.setSpeed(9570);
  }

  getData() {
          this.altitude = Number(this.getProperty("/position/altitude-ft"));
          if (isNaN(this.altitude)) {
                  this.altitude = 0;
          }
          this.setSpeed(this.altitude);
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  setSpeed(value: number) {
        let a10000 = (this.altitude / 10000);
        let a1000 = ((this.altitude % 10000) / 10000);
        let a100 = ((this.altitude % 1000) / 1000);
        this.instrument.rotatePart('altimeter-10000', 36 * a10000);
        this.instrument.rotatePart('altimeter-1000', 360 * a1000);
        this.instrument.rotatePart('altimeter-100', 360 * a100);
  }

}
