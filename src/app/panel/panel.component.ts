import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AsiComponent } from '../instrument/asi/asi.component';
import { VsiComponent } from '../instrument/vsi/vsi.component';

import { ThreedComponent } from '../threed/threed.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @ViewChild(ThreedComponent)
  private instrument: ThreedComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
