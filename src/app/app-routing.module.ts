import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './modules/general/about/about.component';
import {BulletinComponent} from './modules/general/bulletin/bulletin.component';
import {StatComponent} from './modules/general/stat/stat.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'bulletin', component: BulletinComponent },
  { path: 'stat', component: StatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
