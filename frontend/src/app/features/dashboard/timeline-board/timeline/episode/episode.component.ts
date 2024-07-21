import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {

  createEpisodeEventForm: FormGroup;

  constructor() {
    this.createEpisodeEventForm = new FormGroup({
      episode: new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        type: new FormControl(''),
        ownership: new FormControl('')
      }),
      event: new FormGroup({
        date: new FormControl(new Date()),
        // eventList: new FormArray([new FormGroup({
          title: new FormControl(''),
          descriptionPrompt: new FormControl(''),
          description: new FormControl(''),
          imagePrompt: new FormControl(''),
          author: new FormControl('')
        // })])
      })
    })
  }

  createEvent() {

  }

  submitEpisodeEvent() {
    console.log(this.createEpisodeEventForm)
  }
}
