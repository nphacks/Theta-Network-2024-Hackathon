import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1s ease-in')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(-100%)' })),
      transition(':enter', [
        animate('1s ease-in')
      ])
    ]),
    trigger('slideInImage', [
      state('void', style({ transform: 'translateY(-30%)' })),
      transition(':enter', [
        animate('1s ease-in')
      ])
    ]),
    trigger('flyInOutLeft', [
      state('void', style({transform: 'translateX(-10%)'})),
      transition(':enter', [
        animate('0.5s ease-in')
      ]),
    ]),
    trigger('flyInOutRight', [
      state('void', style({transform: 'translateX(10%)'})),
      transition(':enter', [
        animate('0.5s ease-in')
      ]),
    ]),
  ]
})
export class LandingPageComponent {

}
