import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ThreedComponent } from '../../threed/threed.component';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.css']
})
export class AiComponent implements OnInit, AfterViewInit  {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  private aob: number = 0;
  private pitch: number = 0;

  constructor(private fgService: FgService) { }

  ngOnInit() {
        let siht = this;
        setInterval(() => { siht.getData() }, 100);
  }

  ngAfterViewInit() {
          this.instrument.addBackgroundImage("assets/ai-internal.gif", "ai-internal", 0, 0);
          this.instrument.addBackgroundImage("assets/ai-bezel-v2.gif", "ai-bezel", 1, 0);
          this.instrument.addBackgroundImage("assets/ai-aob.gif", "ai-aob", 2, 0);
          this.setSpeed(0, 0);
  }

  getData() {
          this.aob = Number(this.getProperty("/orientation/roll-deg"));
          this.pitch = Number(this.getProperty("/orientation/pitch-deg"));
          if (isNaN(this.aob)) {
                  this.aob = 0;
          }
          if (isNaN(this.pitch)) {
                  this.pitch = 0;
          }
          this.setSpeed(this.aob, this.pitch);
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  setSpeed(aob: number, pitch: number) {
                this.instrument.pitchAndRotate('ai-internal', -3.1*pitch, -aob);
                this.instrument.rotatePart('ai-aob', -aob);
  }

}
