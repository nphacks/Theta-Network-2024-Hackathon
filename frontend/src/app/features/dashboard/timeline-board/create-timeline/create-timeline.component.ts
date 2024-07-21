import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Timeline, Episode } from '../../../../models/timeline.model';
import { TimelineService } from '../../../../services/timeline.service';

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrl: './create-timeline.component.css'
})
export class CreateTimelineComponent {

  timelineForm: FormGroup;
  intentArray = [
    ['Exploratory Analysis (Investigating unknown phenomena)', 'Descriptive Study (Documenting characteristics of a subject)', 'Causal Research (Identifying cause-effect relationships)'] ,
    ['Character Development (Deepening character traits and arcs)', 'Plot Progression (Advancing the main storyline)', 'World-Building (Expanding the setting and context)'],
    ['Basic', 'Intermediate', 'Advance', 'Expert'] ,
    ['Study', 'Reflection', 'Reminder'] ,
  ]
  episodeTypeArray = [
    ['Fact', 'Hypothesis', 'Speculation', 'Conspiracy Theory', 'Controversial'],
    ['Imaginary', 'Factual', 'Liberal'],
    ['Study', 'Fun fact', 'Experiments', 'Problems', 'Quizzes'],
    ['Study', 'Thoughts', 'Routine'],
  ]
  intentOptions: any;
  selectedEpisodeType: any;

  constructor(private fb: FormBuilder, private timelineService: TimelineService) {
    this.timelineForm = this.fb.group({
      timelineName: [''],
      purpose: [''],
      visibility: [''],
      intent: [''],
      editAccess: ['']
    });
  }

  purposeSelected() {
    console.log(this.timelineForm.get('purpose'))
    let purpose = this.timelineForm.get('purpose')?.value
    switch (purpose) {
      case 'Research':
        this.intentOptions = this.intentArray[0]
        this.selectedEpisodeType = this.episodeTypeArray[0]
        break;
      case 'Story Building':
        this.intentOptions = this.intentArray[1]
        this.selectedEpisodeType = this.episodeTypeArray[1]
        break;
      case 'Education Course':
        this.intentOptions = this.intentArray[2]
        this.selectedEpisodeType = this.episodeTypeArray[2]
        break;
      case 'Notes':
        this.intentOptions = this.intentArray[3]
        this.selectedEpisodeType = this.episodeTypeArray[3]
        break;
    }
  }

  submitTimeline() {
    let newTimeline = this.timelineForm.value
    this.timelineService.createTimeline(newTimeline).subscribe((res) => console.log(res))
    console.log(newTimeline)
  }
}
