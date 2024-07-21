import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  private web3: Web3 | undefined;
  private account: string | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if(isPlatformBrowser(this.platformId)) {
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
      } else {
        console.error('MetaMask not detected');
      }
    }
  }

  async connectMetaMask(): Promise<string | null> {
    if (this.web3) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0];
        return this.account;
      } catch (error) {
        console.error('User denied account access', error);
        return null;
      }
    } else {
      console.error('MetaMask not detected');
      return null;
    }
  }

  async verifyAddress(account: string | null, message: string, signature: string) {
    let reqData = {address: account, message, signature}
    return this.http.post('http://localhost:3000/api/user/verify', reqData)
  }

  getAccount(): string | null {
    return this.account;
  }
}