import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./tc.component.css']
})
export class TcComponent implements OnInit, AfterViewInit  {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private roll: number = 0;
  private slip: number = 0;

  constructor(private fgService: FgService) { }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 300);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/tc-ball.gif", "tc-ball", 0, 0);
          this.instrument.addBackgroundImage("assets/turncoord.gif", "tc", 1, 0);
          this.instrument.addBackgroundImage("assets/tc-wings.gif", "tc-wings", 2, 0);
  }

  getData() {
          this.roll = 20 * Number(this.getProperty("/orientation/yaw-rate-degps")) / 3;
          this.slip = Number(this.getProperty("/orientation/side-slip-deg"));
          if (isNaN(this.roll)) {
                  this.roll = 0;
          }
          if (isNaN(this.slip)) {
                  this.slip = 0;
          }
          this.setSpeed(this.roll, this.slip);
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  setSpeed(roll: number, slip: number) {
        this.instrument.rotatePart('tc-wings', roll);
        this.instrument.shiftLeft('tc-ball', slip);
  }

}
