import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/model/Item';
import { ItemService } from './item.service';
import { ToastController } from '@ionic/angular';
import * as QRCode from 'qrcode';
import { ItemClassifications } from 'src/model/ItemClassifications';
import { AgeRanges } from 'src/model/AgeRanges';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  itemIpfsHash?: string | null
  item?: Item | null

  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService, private router: Router, private toastController: ToastController) {
    try{
      const routeSubscripton = this.activatedRoute.paramMap.subscribe( paramMap => {
        routeSubscripton.unsubscribe()
        this.itemIpfsHash = paramMap.get("itemIpfsHash") as string
        this.loadItem()
      })
    }
    catch(err){
      this.itemIpfsHash = null
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    
  }

  async loadItem(){
    const item: Item | undefined = this.router.getCurrentNavigation()?.extras.state as Item
    if(item !== undefined){
      this.item = item
      return
    }

    try{
      const fetchItemRequest = this.itemService.getItem$(this.itemIpfsHash as string).subscribe(async item => {
        fetchItemRequest.unsubscribe()

        // TODO: Re-enable multiple images
        // item.images = item.images.slice(0, 6)
        item.images = item.images.slice(0, 1)
        const imageClassificationPromises = new Array<Promise<null>>
        const userAge: number = Math.abs(
          (new Date(
            Date.now() - new Date(localStorage.getItem("monthOfBirth") as string).getTime()
          ).getUTCFullYear()) - 1970
        )
        
        for (const itemImage of item.images) {
          imageClassificationPromises.push(
            new Promise((resolve, reject) => {
              try {
                const classificationRequest = this.itemService.classifyItemImage$(itemImage).subscribe(classifications => {
                  classificationRequest.unsubscribe()
                  if (ItemClassifications[classifications[0].className.toLowerCase()] === undefined) {
                    reject("item is not registered")
                    return
                  }
                  if (ItemClassifications[classifications[0].className.toLowerCase()]?.ageThreshold === null) {
                    reject("Item is not allowed on the platform")
                    return
                  }
                  if (AgeRanges[ItemClassifications[classifications[0].className.toLowerCase()]?.ageThreshold as keyof typeof AgeRanges].max >= userAge) {
                    reject("User is too young to view item")
                    return
                  }
                  resolve(null)
                })
              }
              catch(err){
                reject(err)
              }
            })
          )
        }

        const textClassificationPromises = new Array<Promise<null>>

        try{
          await Promise.all(imageClassificationPromises.concat(textClassificationPromises))
          this.item = item
        }
        catch(err){
          this.item = null
        }


        // const classifications = await this.mobilenetService.detect(item.images[0])
        // for(const classification of classifications){
        //   if(ItemClassifications[classification.className]?.ageThreshold === null){
        //     // Item is not allowed on the platform
        //     this.item = null
        //     return
        //   }

        //   if(AgeRanges[ItemClassifications[classification.className]?.ageThreshold as keyof typeof AgeRanges].max > Number(localStorage.getItem("monthOfBirth"))){
        //     // User is too young to view item
        //     this.item = null
        //     return
        //   }
        // }

        // TODO: AI text classification of item
        // this.item = item
      })
    }
    catch(err){

    }
  }

  generateSharableLink(): string{
    return "ipfs://" + this.item?.ipfsHash
  }

  async displaySharableQrCode(): Promise<null>{
    await new Promise(resolve => setTimeout(resolve, 10))
    return new Promise((resolve, reject) => {
      QRCode.toCanvas(document.querySelector("#item-page--qr-code-container"), this.generateSharableLink(), { errorCorrectionLevel: 'H' }, (error) => {
        if (error) reject(error)
        resolve(null);
      })
    })
  }


  async copySharableItemLink(){
    navigator.clipboard.writeText(this.generateSharableLink());
    const toast = await this.toastController.create({
      message: 'Item link copied to clipboard',
      duration: 1500,
      position: "bottom"
    })
    toast.present()
  }
}
