import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MySpaceComponent } from './my-space/my-space.component';
import { GroupsComponent } from './groups/groups.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'my-space',
    component: MySpaceComponent,
    canActivate: [authGuard]
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'timeline/:id',
    component: TimelineComponent,
    canActivate: [authGuard]
  },
  {
    path: 'authentication',
    component: AuthenticationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
