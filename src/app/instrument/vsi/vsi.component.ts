import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-vsi',
  templateUrl: './vsi.component.html',
  styleUrls: ['./vsi.component.css']
})
export class VsiComponent implements OnInit, AfterViewInit  {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private verticalspeed: number = 0;

  private lookup: [{}] = [
        {
                'value': -6000,
                'angle': -170
        },
        {
                'value': -4000,
                'angle': -150
        },
        {
                'value': -3000,
                'angle': -135
        },
        {
                'value': -2000,
                'angle': -105
        },
        {
                'value': -1000,
                'angle': -60
        },
        {
                'value': -500,
                'angle': -33
        },
        {
                'value': 0,
                'angle': 0
        },
        {
                'value': -500,
                'angle': 30
        },
        {
                'value': 0,
                'angle': 0
        },
        {
                'value': 500,
                'angle': 33
        },
        {
                'value': 1000,
                'angle': 60
        },
        {
                'value': 2000,
                'angle': 105
        },
        {
                'value': 3000,
                'angle': 135
        },
        {
                'value': 4000,
                'angle': 150
        },
        {
                'value': 6000,
                'angle': 170
        },
  ];

  constructor(private fgService: FgService) { }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 100);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/vsi.gif", "vsi", 0, 0);
          this.instrument.addBackgroundImage("assets/vsi-needle.gif", "vsi-needle", 1, 0);
          this.setSpeed(0);
  }

  getData() {
          this.verticalspeed = Number(this.getProperty("velocities/vertical-speed-fps"));
          if (isNaN(this.verticalspeed)) {
                  this.verticalspeed = 0;
          }
          this.setSpeed(this.verticalspeed * 60);
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  lookupMap(value: number) {
        let v1 = 0;
        let v2 = 0;
        let a1 = 0;
        let a2 = 0;
        for (let i = 0; i < this.lookup.length; i++) {
                let known = this.lookup[i];
                let kv = known['value'];
                let ka = known['angle'];
                if (value === kv) {
                        return (ka);
                } else if (value > kv) {
                        v1 = kv;
                        a1 = ka;
                } else if (value < kv) {
                        v2 = kv;
                        a2 = ka;
                        let interp = a1 + (a2 - a1) * (value - v1) / (v2 - v1);
                        return interp;
                }
        }
        return 0;
  }

  setSpeed(value: number) {
                let ang = this.lookupMap(Number(value));
                this.instrument.rotatePart('vsi-needle', ang);
  }

}
