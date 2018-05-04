import { Component, OnInit } from '@angular/core';
import { FgService } from '../../fg.service';

@Component({
  selector: 'app-chsi',
  templateUrl: './chsi.component.html',
  styleUrls: ['./chsi.component.css']
})
export class ChsiComponent implements OnInit {

  constructor(private fgService: FgService) { }

  ngOnInit() {
  }

  getProperty(path: string): string {
        let v = this.fgService.getValue(path);
        if (v === undefined) {
                return '?';
        }
        return v;
  }

  setObs(delta: number) {
        let obsPath = "/instrumentation/hsi/inputs/radials/";
        let obsItem = "selected-deg";
        let obs = Number(this.getProperty(obsPath + obsItem));
        if (! isNaN(obs)) {
                obs = (obs + delta) % 360;
                this.fgService.setProperty(obsPath, obsItem, String(obs));
        }
  }

  setBug(delta: number) {
        let obsPath = "/autopilot/settings/";
        let obsItem = "heading-bug-deg";
        let obs = Number(this.getProperty(obsPath + obsItem));
        if (! isNaN(obs)) {
                obs = (obs + delta) % 360;
                this.fgService.setProperty(obsPath, obsItem, String(obs));
        }
  }

}
