import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { AsiComponent } from './instrument/asi/asi.component';
import { VsiComponent } from './instrument/vsi/vsi.component';
import { AboutComponent } from './about/about.component';
import { PanelComponent } from './panel/panel.component';
import { ThreedComponent } from './threed/threed.component';

import { FgService } from './fg.service';
import { AiComponent } from './instrument/ai/ai.component';
import { AltimeterComponent } from './instrument/altimeter/altimeter.component';
import { TcComponent } from './instrument/tc/tc.component';
import { HsiComponent } from './instrument/hsi/hsi.component';
import { EmsComponent } from './instrument/ems/ems.component';
import { DmeComponent } from './instrument/dme/dme.component';

import { CdmeComponent } from './controls/cdme/cdme.component';
import { ChsiComponent } from './controls/chsi/chsi.component';



@NgModule({
  declarations: [
    AboutComponent,
    AiComponent,
    AltimeterComponent,
    AppComponent,
    AsiComponent,
    CdmeComponent,
    ChsiComponent,
    DmeComponent,
    EmsComponent,
    HsiComponent,
    PanelComponent,
    TcComponent,
    ThreedComponent,
    VsiComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [FgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
