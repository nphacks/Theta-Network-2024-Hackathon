import { Component } from '@angular/core';
import { TimelineService } from '../../../services/timeline.service';

@Component({
  selector: 'app-timeline-board',
  templateUrl: './timeline-board.component.html',
  styleUrl: './timeline-board.component.css'
})
export class TimelineBoardComponent {

  constructor(private timelineService: TimelineService) {

  }

  ngOnInit() {
    this.timelineService.getAllTimelineData().subscribe((res) => console.log('Hello', res), (err) => console.log(err))
  }
}
