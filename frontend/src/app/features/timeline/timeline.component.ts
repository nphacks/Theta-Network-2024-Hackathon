import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { TimelineService } from '../../services/timeline.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
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
    ]),
    trigger('slideInFromTop', [
      transition(':enter', [
        // Keyframes for incremental animation
        animate('0.5s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class TimelineComponent {
  timelineAvailable: any = [];
  timelineData: any;
  mainTimeline: any = [];
  allParallelTimelines: any = [];
  formSelected: string = ''
  userData = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
  isCollapsed: boolean = true;
  episodeEditing: any[] = [false, 0];

  constructor(private fb: FormBuilder, private timelineService: TimelineService, private route: ActivatedRoute) {
    this.generatedImages = { 0: []};
    this.uploadedImages = {0: []};
    this.generatedVideos = {};
    this.uploadedVideos = {};
  }

  ngOnInit() {
    this.getTimelineInformation()
  }

  scrollRight(index: number) {
    (<HTMLDivElement>document.getElementById('timeline'+index)).scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' });
  }

  scrollLeft(index: number) {
    (<HTMLDivElement>document.getElementById('timeline'+index)).scrollBy({ left: -window.innerWidth * 0.5, behavior: 'smooth' });
  }

  scrollRightMainTimeline() {
    (<HTMLDivElement>document.getElementById('main-timeline')).scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' });
  }

  scrollLeftMainTimeline() {
    (<HTMLDivElement>document.getElementById('main-timeline')).scrollBy({ left: -window.innerWidth * 0.5, behavior: 'smooth' });
  }
  

  openForm(form: string) {
    this.formSelected = form
  }

  getTimelineInformation() {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.timelineService.getTimelineData(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.timelineData = (res as any)['data']
      this.timelineAvailable.push('Main Timeline')
      if(this.timelineData.parallelTimelines != null) {
        for(let i = 0; i < this.timelineData.parallelTimelines.length; i++) {
           let j = i + 1
          this.timelineAvailable.push('Parallel Timeline ' + j)
        }
      } 
      this.getAllTimelines()
    })
  }

  getAllTimelines() {
    this.mainTimeline = []
    this.allParallelTimelines = []
    if(this.timelineData.mainTimeline != null) {
      this.mainTimeline = this.timelineData.mainTimeline
    }
    if(this.timelineData.parallelTimelines != null) {
      for(let timeline of this.timelineData.parallelTimelines) {
        this.allParallelTimelines.push(timeline)
      }
    }
    console.log('ALL =>', this.mainTimeline, this.allParallelTimelines)
  }

  drawerState = 'closed';

  toggleDrawer() {
    this.drawerState = this.drawerState === 'closed' ? 'open' : 'closed';
    if(this.drawerState === 'closed') {
      this.addEpisodeForm.reset()
    }
  }


  // ADD EPISODE FORM
  episodeTimelines = []
  generatedImages: { [key: number]: string[] } ;
  uploadedImages: { [key: number]: string[] } ;
  generatedVideos: { [key: number]: string[] } ;
  uploadedVideos: { [key: number]: string[] } ;
  addEpisodeForm: FormGroup = this.fb.group({
    episodeTimeline: ['', Validators.required],
    episodeTitle: ['', Validators.required],
    episodeDescription: ['', Validators.required],
    events: this.fb.array([])
  });


  get events() : FormArray {
    return this.addEpisodeForm.get('events') as FormArray;
  }

  addEvent() {
    const eventGroup = this.fb.group({
      eventTitle: ['', Validators.required],
      eventDescription: ['', Validators.required],
      imagePrompt: [''],
      images: [],
      videoPrompt: [''],
      videos: []
    });
    this.events.push(eventGroup);
  }

  removeEvent(index: number) {
    this.events.removeAt(index);
  }

  currentGenerateImage = ''
  generateImage(index: number) {
    console.log(this.currentGenerateImage)
    this.timelineService.generateImage({input: this.currentGenerateImage}).subscribe(res => {
      console.log(res)
    });
    this.currentGenerateImage = ''
  }

  currentGenerateVideo = ''
  generateVideo(index: number) {
    this.timelineService.generateImage({prompt: this.currentGenerateVideo}).subscribe(res => {
      console.log(res)
    });
    this.currentGenerateVideo = ''
  }

  addEpisodeSubmit() {
    console.log(this.addEpisodeForm.value, this.timelineData, this.userData);
    let formValue = this.addEpisodeForm.value
    let requestBody = this.timelineData;
    if(this.episodeEditing[0] === false) {
      if(formValue.episodeTimeline == 'Main Timeline') {
        let episode = {
          timelineId: this.timelineData._id,
          timelineStatus: 'Main Timeline',
          episodeTitle: formValue.episodeTitle,
          episodeDescription: formValue.episodeDescription,
          creator: this.userData._id,
          events: formValue.events
        }
        if(requestBody.mainTimeline == null) {
          requestBody.mainTimeline = [episode]
        } else {
          requestBody.mainTimeline.push(episode)
        }
      } else {
        let timelineIndex = formValue.episodeTimeline.match(/\d+/)[0]
        let episode = {
          timelineId: this.timelineData._id,
          timelineStatus: formValue.timelineStatus,
          episodeTitle: formValue.episodeTitle,
          episodeDescription: formValue.episodeDescription,
          creator: this.userData._id,
          updated: true,
          events: formValue.events
        }
        requestBody.parallelTimelines[timelineIndex-1].push(episode)
      }
    } else {
      let timelineIndex = formValue.episodeTimeline.match(/\d+/)[0]
        let episode = {
          timelineId: this.timelineData._id,
          timelineStatus: formValue.timelineStatus,
          episodeTitle: formValue.episodeTitle,
          episodeDescription: formValue.episodeDescription,
          creator: this.userData._id,
          updated: true,
          events: formValue.events
        }
        requestBody.parallelTimelines[timelineIndex-1].splice(this.episodeEditing[1], 1, episode)
        this.episodeEditing = [false]
    }
    this.timelineService.addEpisode(this.timelineData._id, requestBody).subscribe(
      (res) => {
        console.log(res)
        this.timelineData = (res as any)['data']
        this.getAllTimelines()
        this.addEpisodeForm.reset()
        this.drawerState = 'closed';
      },
      (err) => console.log(err)
    )
  }

  editEpisode(timelineIndex: number, episodeIndex: number, episode: any) {
    this.episodeEditing = [true, episodeIndex]
    this.toggleDrawer()
    const eventsArray = this.addEpisodeForm.get('events') as FormArray;
    eventsArray.clear();
    timelineIndex = timelineIndex + 1
    this.addEpisodeForm.patchValue({
      episodeTimeline: 'Parallel Timeline ' + timelineIndex,
      episodeTitle: episode.episodeTitle,
      episodeDescription: episode.episodeDescription,
    });

    episode.events.forEach((event: any) => {
      eventsArray.push(this.fb.group({
        eventTitle: [event.eventTitle, Validators.required],
        eventDescription: [event.eventDescription, Validators.required],
        imagePrompt: [event.imagePrompt || ''],
        model: [event.model || ''],
        image: [event.image || ''],
        videoPrompt: [event.videoPrompt || ''],
        videoModel: [event.videoModel || ''],
        video: [event.video || '']
      }));
    });
  }

  createNewParallelTimeline() {
    let requestBody = this.timelineData;
    requestBody.parallelTimelines = []
    requestBody.parallelTimelines.push(this.mainTimeline)
    let length = this.allParallelTimelines.length + 1
    for(let episode of requestBody.parallelTimelines[requestBody.parallelTimelines.length-1]) {
      episode.timelineStatus = 'Parallel Timeline ' + length
      episode.updated = false
    }
    this.timelineService.addParallelTimeline(this.timelineData._id, requestBody).subscribe(
      (res) => {
        console.log(res)
        this.getAllTimelines()
        this.timelineAvailable.push('Parallel Timeline ' + length)
      },
      (err) => console.log(err)
    )
  }
}
