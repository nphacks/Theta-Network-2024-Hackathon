import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';


import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HeaderComponent } from '../core/header/header.component';
import { SideNavbarComponent } from '../core/side-navbar/side-navbar.component';
import { FeaturesComponent } from './features.component';
import { MySpaceComponent } from './my-space/my-space.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTimelineFormComponent } from '../core/create-timeline-form/create-timeline-form.component';
import { AddEpisodeFormComponent } from '../core/add-episode-form/add-episode-form.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TimelineComponent,
    HeaderComponent,
    AuthenticationComponent,
    SideNavbarComponent,
    FeaturesComponent,
    MySpaceComponent,
    GroupsComponent,
    SettingsComponent,
    CreateTimelineFormComponent,
    AddEpisodeFormComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,  
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule
  ]
})
export class FeaturesModule { }
