import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-episode-form',
  templateUrl: './add-episode-form.component.html',
  styleUrl: './add-episode-form.component.css'
})
export class AddEpisodeFormComponent {

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

  constructor(private fb: FormBuilder) {
    this.generatedImages = { 0: []};
    this.uploadedImages = {0: []};
    this.generatedVideos = {};
    this.uploadedVideos = {};
  }

  ngOnInit() {
  }

  get events() : FormArray {
    return this.addEpisodeForm.get('events') as FormArray;
  }

  addEvent() {
    const eventGroup = this.fb.group({
      eventTitle: ['', Validators.required],
      eventDescription: ['', Validators.required],
      images: this.fb.array([]),
      videos: this.fb.array([])
    });
    this.events.push(eventGroup);
  }

  removeEvent(index: number) {
    this.events.removeAt(index);
  }

  generateImage(index: number) {
    const prompt = this.events.at(index).get('imagePrompt')?.value;
    const model = this.events.at(index).get('model')?.value;
    // Send prompt and model to the server and get generated images
    // For example:
    // this.imageService.generateImage(prompt, model).subscribe(images => {
    //   this.generatedImages[index] = images;
    // });
  }

  toggleImageSelection(eventIndex: number, image: string) {
    // const selectedImages = this.events.at(eventIndex).get('image').value;
    // if (selectedImages.includes(image)) {
    //   this.events.at(eventIndex).get('image').setValue(selectedImages.filter(img => img !== image));
    // } else {
    //   this.events.at(eventIndex).get('image').setValue([...selectedImages, image]);
    // }
  }

  onImageUpload(event: any, eventIndex: number) {
    const files = event.target.files;
    if (files) {
      // const fileReaders: FileReader[] = [];
      // const uploadedImages: string[] = [];
      // for (let i = 0; i < files.length; i++) {
      //   const fileReader = new FileReader();
      //   fileReader.onload = (e: any) => {
      //     uploadedImages.push(e.target.result);
      //     if (uploadedImages.length === files.length) {
      //       this.uploadedImages[eventIndex] = uploadedImages;
      //     }
      //   };
      //   fileReader.readAsDataURL(files[i]);
      // }
    }
  }

  generateVideo(index: number) {
    // const prompt = this.events.at(index).get('videoPrompt').value;
    // const model = this.events.at(index).get('videoModel').value;
    // // Send prompt and model to the server and get generated videos
    // // For example:
    // this.videoService.generateVideo(prompt, model).subscribe(videos => {
    //   this.generatedVideos[index] = videos;
    // });
  }
  
  toggleVideoSelection(eventIndex: number, video: string) {
    // const selectedVideos = this.events.at(eventIndex).get('video').value;
    // if (selectedVideos.includes(video)) {
    //   this.events.at(eventIndex).get('video').setValue(selectedVideos.filter(vid => vid !== video));
    // } else {
    //   this.events.at(eventIndex).get('video').setValue([...selectedVideos, video]);
    // }
  }
  
  onVideoUpload(event: any, eventIndex: number) {
    // const files = event.target.files;
    // if (files) {
    //   const fileReaders: FileReader[] = [];
    //   const uploadedVideos: string[] = [];
    //   for (let i = 0; i < files.length; i++) {
    //     const fileReader = new FileReader();
    //     fileReader.onload = (e: any) => {
    //       uploadedVideos.push(e.target.result);
    //       if (uploadedVideos.length === files.length) {
    //         this.uploadedVideos[eventIndex] = uploadedVideos;
    //       }
    //     };
    //     fileReader.readAsDataURL(files[i]);
    //   }
    // }
  }

  onSubmit() {
    console.log(this.addEpisodeForm.value);
  }
}
