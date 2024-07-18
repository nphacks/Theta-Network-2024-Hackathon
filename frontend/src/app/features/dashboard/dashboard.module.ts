import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TimelineService } from '../../services/timeline.service';
import { TimelineBoardComponent } from './timeline-board/timeline-board.component';
import { TimelineComponent } from './timeline-board/timeline/timeline.component';
import { CreateTimelineComponent } from './timeline-board/create-timeline/create-timeline.component';
import { TimelineSettingsComponent } from './timeline-board/timeline-settings/timeline-settings.component';
import { EpisodeComponent } from './timeline-board/timeline/episode/episode.component';
import { EpisodeSettingsComponent } from './timeline-board/timeline/episode-settings/episode-settings.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TimelineBoardComponent,
    TimelineComponent,
    CreateTimelineComponent,
    TimelineSettingsComponent,
    EpisodeComponent,
    EpisodeSettingsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  providers: [TimelineService]
})
export class DashboardModule { }
