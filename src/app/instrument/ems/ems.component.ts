import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-ems',
  templateUrl: './ems.component.html',
  styleUrls: ['./ems.component.css']
})
export class EmsComponent implements OnInit, AfterViewInit  {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private fan_l: number = 50;
  private fan_r: number = 50;
  private itt_l: number = 50;
  private itt_r: number = 50;
  private n2_l: number = 50;
  private n2_r: number = 50;

  constructor(private fgService: FgService) {
      this.fgService.setDebugValue("/engines/engine/fan", 60, 55, 80);
      this.fgService.setDebugValue("/engines/engine[1]/fan", 60, 55, 80);
      this.fgService.setDebugValue("/engines/engine/itt-norm-display", 600, 500, 670);
      this.fgService.setDebugValue("/engines/engine[1]/itt-norm-display", 600, 500, 670);
      this.fgService.setDebugValue("/engines/engine/turbine", 70, 55, 80);
      this.fgService.setDebugValue("/engines/engine[1]/turbine", 70, 55, 80);
  }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 300);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/engine.gif", "ems-card", 0, 0);
          this.instrument.addRibbon("ems-fan-l", -126, -32, 10, 140, 0xffffff);
          this.instrument.addRibbon("ems-fan-r", -99, -32, 10, 140, 0xffffff);

          this.instrument.addRibbon("ems-itt-l", -8, -45, 10, 150, 0xffffff);
          this.instrument.addRibbon("ems-itt-r", 20, -45, 10, 150, 0xffffff);

          this.instrument.addRibbon("ems-n2-l", 107, -100, 10, 200, 0xffffff);
          this.instrument.addRibbon("ems-n2-r", 143, -100, 10, 200, 0xffffff);
  }

  getData() {
          this.fan_l = Math.abs(Number(this.getProperty("/engines/engine/fan")));
          this.fan_r = Math.abs(Number(this.getProperty("/engines/engine[1]/fan")));
          this.itt_l = Math.abs(Number(this.getProperty("/engines/engine/itt-norm-display")));
          this.itt_r = Math.abs(Number(this.getProperty("/engines/engine[1]/itt-norm-display")));
          this.n2_l = Math.abs(Number(this.getProperty("/engines/engine/turbine")));
          this.n2_r = Math.abs(Number(this.getProperty("/engines/engine[1]/turbine")));
          if (isNaN(this.fan_l)) {
                  this.fan_l = 0;
          }
          if (isNaN(this.fan_r)) {
                  this.fan_r = 0;
          }
          if (isNaN(this.itt_l)) {
                  this.itt_l = 0;
          }
          if (isNaN(this.itt_r)) {
                  this.itt_r = 0;
          }
          if (isNaN(this.n2_l)) {
                  this.n2_l = 0;
          }
          if (isNaN(this.n2_r)) {
                  this.n2_r = 0;
          }
          this.setSpeed(this.fan_l/100, this.fan_r/100, this.itt_l/1000, this.itt_r/1000, this.n2_l/100, this.n2_r/100);
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  setSpeed(fanl: number, fanr: number, ittl, ittr: number, n2l, n2r: number) {
          this.setText("ems-fan-l", fanl);
          this.instrument.adjustRibbon("ems-fan-l", fanl);
          this.instrument.adjustRibbon("ems-fan-r", fanr);

          this.instrument.adjustRibbon("ems-itt-l", ittl);
          this.instrument.adjustRibbon("ems-itt-r", ittr);

          this.instrument.adjustRibbon("ems-n2-l", n2l);
          this.instrument.adjustRibbon("ems-n2-r", n2r);
  }

  setText(name: string, value: number) {
  }

}
