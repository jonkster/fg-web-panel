import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsiComponent } from './instrument/asi/asi.component';
import { VsiComponent } from './instrument/vsi/vsi.component';
import { AboutComponent } from './about/about.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
        { path: '', component: AboutComponent },
        { path: 'about', component: AboutComponent },
        { path: 'panel', component: PanelComponent },
        { path: 'instrument/asi', component: AsiComponent },
        { path: 'instrument/vsi', component: VsiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
