import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
// import { ElectronService } from 'src/external-services/electron.service';
// import { ElectronService } from 'ngx-electron';
import { IpfsService } from 'src/external-services/ipfs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  // webSocket = new WebSocket(window.origin)
  
  // constructor(private ipfsService: IpfsService, private electronService: ElectronService) {
  constructor(private ipfsService: IpfsService, private alertController: AlertController) {
    // this.ipfsService.getObject().then(cid => {console.log(cid)})\
    
  }


  ngOnInit(){
    const redirectionURL: string | null = (new URLSearchParams(window.location.search)).get("redirect")
    
  }

  async presentAgeModal() {
    // const alert = await this.alertController.create({
    //   header: 'Please enter your info',
    //   buttons: ['OK'],
    //   inputs: [
    //     {
    //       placeholder: 'Name',
    //     },
    //     {
    //       placeholder: 'Nickname (max 8 characters)',
    //       attributes: {
    //         maxlength: 8,
    //       },
    //     },
    //     {
    //       type: 'number',
    //       placeholder: 'Age',
    //       min: 1,
    //       max: 100,
    //     },
    //     {
    //       type: 'textarea',
    //       placeholder: 'A little about yourself',
    //     },
    //   ],
    // });

    // await alert.present()
  }
}
