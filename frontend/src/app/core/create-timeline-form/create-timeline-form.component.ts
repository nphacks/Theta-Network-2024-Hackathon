import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimelineService } from '../../services/timeline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-timeline-form',
  templateUrl: './create-timeline-form.component.html',
  styleUrl: './create-timeline-form.component.css'
})
export class CreateTimelineFormComponent {
  createTimelineForm: FormGroup;
  allUsers: any = [];
  usersData: any;
  filteredUsers: string[] = [];

  constructor(private fb: FormBuilder, private timelineService: TimelineService, private router: Router) {
  
    let user = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    this.createTimelineForm = this.fb.group({
      timelineName: ['', Validators.required],
      description: [''],
      visibility: ['private', Validators.required],
      // editAccess: ['private', Validators.required],
      groupUsers: [[]],
      mainTimeline: [],
      parallelTimelines: [],
      creatorId: [user?._id]
    })
  }

  ngOnInit() {
    // this.createTimelineForm.get('groupUsers')?.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // ).subscribe(filtered => this.filteredUsers = filtered);
    this.getUsers()
  }

  onSubmit() {
    console.log(this.createTimelineForm.value.groupUsers)
    let requestBody = this.createTimelineForm.value
    let groupUsers = []
    for(let user of this.createTimelineForm.value.groupUsers) {
      groupUsers.push(user)
    }
    requestBody.groupUsers = groupUsers;
    console.log(requestBody)
    this.timelineService.createTimeline(this.createTimelineForm.value).subscribe((res) => {
      console.log(res)
    }, (err) => console.log(err))
  }

  getUsers() {
    this.timelineService.getAllUsers().subscribe((res) => {
      this.usersData = (res as any)['data']
      console.log(this.usersData)
      for(let user of this.usersData) {
        this.allUsers.push({userTitle: user.firstname + ' ' + user.lastname + '   (' + user.username + ')', user: user})
      }
    }, (err) => console.log(err))
  }
}
