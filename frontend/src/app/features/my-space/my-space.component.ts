import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TimelineService } from '../../services/timeline.service';

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrl: './my-space.component.css',
  animations: [
    trigger('collapseExpand', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('drawerAnimation', [
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      state('open', style({
        transform: 'translateX(0)'
      })),
      transition('closed => open', [
        animate('0.3s ease-out')
      ]),
      transition('open => closed', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class MySpaceComponent {

  myTimelineData: any = []
  isCollapsed: boolean = true;
  user: any = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  constructor(private timelineService: TimelineService) {}

  ngOnInit() {
    this.myTimelineData = this.timelineService.getAllTimelinesOfAUser(this.user['_id']).subscribe((res) =>
      {
        console.log(res)
        this.myTimelineData = (res as any).data
      }, (err) => console.log(err))
    console.log(this.user)
  }

  openForm() {
    this.isCollapsed = !this.isCollapsed;
  }

  drawerState = 'closed';
  toggleDrawer() {
    this.drawerState = this.drawerState === 'closed' ? 'open' : 'closed';
  }

  
}
