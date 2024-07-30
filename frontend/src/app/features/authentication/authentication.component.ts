import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  
  selectedTab: string = 'loginForm';
  user = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    reenterPassword: ''
  };

  constructor(private authService: AuthenticationService, private router: Router) {}

  onSubmitRegister(form: any) {
    if (form.valid && form.password == form.reenterPassword) {
      console.log('User Registration Data:', this.user, form);
      // Handle form submission logic here
      this.authService.registerUser(form.form.value).subscribe((res) => {
        console.log(res)
        
      }, (err) => console.log(err))
    }
  }

  login = {
    username: '',
    password: '',
  };

  onSubmitLogin(form: any) {
    if (form.valid) {
      console.log('User Registration Data:', this.login);
      // Handle form submission logic here
      this.authService.loginUser(form.form.value).subscribe((res) => {
        console.log(res)
        const resData: {[key: string]: any} = res
        console.log("Hello=>", resData['status'],resData['user'],resData['token'])
        localStorage.setItem('user', JSON.stringify(resData['user']));
        localStorage.setItem('token', resData['token']);
        if(resData['status'] == 'success') {
          console.log('Hello')
          this.router.navigate(['/my-space'])
        }
      }, (err) => console.log(err))
    }
  }
}
