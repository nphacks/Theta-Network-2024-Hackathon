import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TimelineService } from '../../services/timeline.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class GroupsComponent {

  groupTimelineData: any = []
  isCollapsed: boolean = true;
  user: any = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  constructor(private timelineService: TimelineService) {}

  ngOnInit() {
    this.groupTimelineData = this.timelineService.getAllTimelinesOfAUserGroup(this.user?._id).subscribe((res) => {
      this.groupTimelineData = (res as any).data
      console.log(res)
    }, err => console.log(err))
  }

  openForm() {
    this.isCollapsed = !this.isCollapsed;
  }
}