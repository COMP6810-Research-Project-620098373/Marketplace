import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  depositAddress: string = ""

  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.displayQrCode("hello worldhello worldhello worldhello worldhello world")
  }

  displayQrCode(data: string): Promise<null>{
    return new Promise((resolve, reject) => {
      QRCode.toCanvas(document.querySelector("#account-page--qr-code-container"), data, (error) => {
        if (error) reject(error)
        resolve(null);
      })
    })
  }

  async copyDepositAddress(){
    navigator.clipboard.writeText(this.depositAddress);
    const toast = await this.toastController.create({
      message: 'Deposit address copied to clipboard',
      duration: 1500,
      position: "bottom"
    })
    toast.present()
  }

}
