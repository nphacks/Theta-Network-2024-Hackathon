import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isAuthenticated = false

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit() {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.changeHeading();
    //   });
    this.authService.isAuthenticated$.subscribe(authStatus => {
      this.isAuthenticated = authStatus
    }) 
  }

  ngOnChanges() {
    
  }

  changeHeading() {
    // console.log('HEading change', this.router.url)
    // if(this.router.url === '/dashboard') {
    //   this.heading = 'Dashboard'
    //   console.log('Heading change to =>', this.heading)
    // }
    // if(this.router.url === '/my-space') {
    //   this.heading = 'Your Space'
    //   console.log('Heading change to =>', this.heading)
    // }
    // if(this.router.url === '/groups') {
    //   this.heading = 'Your Group'
    //   console.log('Heading change to =>', this.heading)
    // }
  }
}
