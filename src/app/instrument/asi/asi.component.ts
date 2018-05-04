import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-asi',
  templateUrl: './asi.component.html',
  styleUrls: ['./asi.component.css']
})
export class AsiComponent implements OnInit, AfterViewInit   {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private airspeed: number = 0;
  /*private groundspeed: string = '0';
  private verticalspeed: string = '0';
  private altitude: string = '0';
  private heading: string = '0';
  private bank: string = '0';
  private pitch: string = '0';
  private turnRate: string = '0';
  private slip: string = '0';*/

  private lookup: {[s:number]: number;} = {
        0: -7,
        60: 2,
        70: 5,
        80: 20,
        100: 48,
        120: 75,
        140: 100,
        160: 127,
        180: 152,
        200: 177,
        220: 203,
        240: 228,
        250: 242,
        300: 263,
        350: 283,
        400: 303,
        450: 325
  };


  constructor(private fgService: FgService) { }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 100);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/panel.gif", "asi", -1, 0);
          this.instrument.addBackgroundImage("assets/asi-full.gif", "asi", 0, 0);
          this.instrument.addBackgroundImage("assets/asi-needle-full.gif", "asi-needle", 1, 0);
          this.setSpeed(0);
  }

  getData() {
          this.airspeed = Number(this.getProperty("velocities/airspeed-kt"));
          /*this.groundspeed = this.getProperty("velocities/groundspeed-kt");
          this.verticalspeed = this.getProperty("velocities/vertical-speed-fps");
          this.altitude = this.getProperty("/position/altitude-ft");
          this.heading = this.getProperty("/orientation/heading-magnetic-deg");
          this.bank = this.getProperty("/orientation/roll-deg");
          this.slip = this.getProperty("/orientation/side-slip-deg");
          this.pitch = this.getProperty("/orientation/pitch-deg");
          this.turnRate = this.getProperty("/orientation/yaw-rate-degps");*/
          if (isNaN(this.airspeed)) {
                  this.airspeed = 0;
          }
          this.setSpeed(Number(this.airspeed));
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  lookupMap(value: number) {
        if (value === 0) {
                return this.lookup[0];
        }
        let points = Object.keys(this.lookup);
        let v1 = 0;
        let v2 = 0;
        for (let p in this.lookup) {
                if (value == Number(p)) {
                        return (this.lookup[p]);
                } else if (value > Number(p)) {
                        v1 = Number(p);
                } else if (value < Number(p)) {
                        v2 = Number(p);
                        let a1 = this.lookup[v1];
                        let a2 = this.lookup[v2];
                        let interp = a1 + (a2 - a1) * (value - v1) / (v2 - v1);
                        return interp;
                }
        }
        return 0;
  }

  setSpeed(knots: number) {
                let ang = this.lookupMap(knots);
                this.instrument.rotatePart('asi-needle', ang);
  }

}
