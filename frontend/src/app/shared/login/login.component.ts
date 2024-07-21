import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MetamaskService } from '../../core/metamask.service';
import { RegisterService } from '../../core/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  account: string | null = null;
  loginButtonDisable: boolean = true;
  message = "Please sign this message to verify your wallet address.";
  signature: any
  metamaskResponse: any;
  
  constructor(private metamaskService: MetamaskService, private loginService: RegisterService) {}

  async connectMetaMask(): Promise<void> {
    this.account = await this.metamaskService.connectMetaMask();
    console.log(this.account)
    if (this.account) {
      await this.verifyWallet();
    }
  }
 
  async verifyWallet(): Promise<void> {
    
    try {
      this.signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [this.message, this.account]
      });
      (await this.metamaskService.verifyAddress(this.account, this.message, this.signature)).subscribe(
        (res) => {
          console.log(res)
          this.metamaskResponse = res
          this.loginButtonDisable = false
    }) 
    } catch (error) {
      console.error('Error in verify Wallet')
      this.loginButtonDisable = true
    }
  }

  submitLoginForm(loginForm: any) {
    console.log('Submit', loginForm, this.message, this.signature, this.metamaskResponse.signerAddress)
    let loginData = {
      email: loginForm.email,
      password: loginForm.password,
      metamaskConnected: true,
      address: this.account,
      message: this.message,
      signature: this.signature,
      signerAddress: this.metamaskResponse.signerAddress
    }
    this.loginService.loginUser(loginData).subscribe(res => console.log(res))
  }
}
