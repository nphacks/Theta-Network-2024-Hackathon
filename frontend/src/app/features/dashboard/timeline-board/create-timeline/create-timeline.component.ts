import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrl: './create-timeline.component.css'
})
export class CreateTimelineComponent {

  constructor(private fb: FormBuilder) {}

  timelineForm: FormGroup = this.fb.group({
    timelineName: [''],
    purpose: [''],
    visibility: [''],
    intent: [''],
    episode: this.fb.group({
      types: this.fb.array([]),
      ownership: ['']
    }),
    event: this.fb.group({
      formatAllowed: []
    })
  });

  submitTimeline() {
    console.log(this.timelineForm)
  }
}
