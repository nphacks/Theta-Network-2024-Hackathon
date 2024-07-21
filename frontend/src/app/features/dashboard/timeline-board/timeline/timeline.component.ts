import { Component } from '@angular/core';
import { TimelineService } from '../../../../services/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

  timelineData: any;
  timelineName: string;
  timelinePurpose: string;
  timelineIntent: string;
  timelineEpisodesVersion: any = [];

  constructor(private timelineService: TimelineService) {
    this.timelineName = ''
    this.timelinePurpose = ''
    this.timelineIntent = ''
  }

  ngOnInit() {
    // this.timelineService.getAllTimelineData().subscribe((res) => { 
    //   this.timelineData = res
    //   this.timelineName = this.timelineData.data.timelineName
    //   this.timelinePurpose = this.timelineData.data.purpose
    //   this.timelineIntent = this.timelineData.data.intent
    //   for(let episodesVersions of this.timelineData.data.episodeVersions) {
    //     this.timelineEpisodesVersion.push(episodesVersions)
    //   }
    //   console.log(this.timelineEpisodesVersion)
    // }, (err) => console.log(err))
  }
}
