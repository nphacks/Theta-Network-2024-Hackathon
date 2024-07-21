import { Component } from '@angular/core';
import { MetamaskService } from '../../core/metamask.service';
import { RegisterService } from '../../core/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private registerService: RegisterService) {}

  submitRegisterForm(registerForm: any) {
    // console.log(registerForm)
    // if(registerForm['password'] === registerForm['reenterPassword']) {
      const user = { fullname: registerForm.name, email: registerForm.email, password: registerForm.password, metamaskConnected: false }
      console.log('Ready to go')
      this.registerService.registerUser(user).subscribe((res) => console.log(res))
    // }
    
  }
}
