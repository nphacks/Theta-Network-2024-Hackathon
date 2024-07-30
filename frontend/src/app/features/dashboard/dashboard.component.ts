import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimelineService } from '../../services/timeline.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  dashboardTimelineData: any = []

  constructor(private route: Router, private timelineService: TimelineService) {}

  ngOnInit() {
    this.dashboardTimelineData = this.timelineService.getAllTimelinesWithPublic().subscribe((res) => {
      this.dashboardTimelineData = (res as any).data
      console.log(res)
    }, err => console.log(err))
  }

  timelineInformation(id: string) {
    this.route.navigate(['/timeline'])
  }
}
