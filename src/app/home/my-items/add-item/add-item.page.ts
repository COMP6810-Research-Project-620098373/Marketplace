import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/external-services/database.service';
import { FormValidator } from 'src/model/FormValidator';
import { Item } from 'src/model/Item';
import { ItemCategories } from 'src/model/ItemCategories';
import { Visibility } from 'src/model/Visibility';
import { AddItemService } from './add-item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  itemCategories: Array<string> = Object.keys(ItemCategories)
  itemImages: Array<string> = []

  addItemForm = new FormValidator<{
    category: string,
    visibility: string,
    title: string,
    cost: string,
    contact: string,
  },{
    category: string | undefined,
    visibility: string | undefined, 
    title: string | undefined,
    cost: string | undefined,
    contact: string | undefined,
  }>({
    category: "",
    visibility: "",
    title: "",
    cost: "",
    contact: "",
    
  },{
    category: <string | undefined>"",
    visibility: <string | undefined>"",
    title: <string | undefined>"",
    cost: <string | undefined>"",
    contact: <string | undefined>"",
  }, async () => {
    this.addItemForm.isSubmitting = true
    const loading = (await this.loadingCtrl.create({
      message: 'Submitting Item..',
      backdropDismiss: false
    }))

    try{
      if(this.itemImages.length === 0){
        const toast = await this.toastController.create({
          message: 'At least one image required',
          duration: 1500,
          position: "bottom"
        })
        toast.present()
        return;
      }
      
      await loading.present()

      const item: Item = {
        title: this.addItemForm.values.title,
        cost: Number(this.addItemForm.values.cost),
        contact: this.addItemForm.values.contact,
        visibility: this.addItemForm.values.visibility as Visibility,
        category: this.addItemForm.values.category as ItemCategories,
        images: this.itemImages,
        ethereumTransactionHash: null,
        ipfsHash: null,
        description: ""
      }

      const ipfsHash: string = await this.addItemService.submitItemToIPFS(item as Item)
      item.ipfsHash = ipfsHash

      if(this.addItemForm.values.visibility === Visibility.Public){
        const ethreumTransactionID = await this.addItemService.submitItemToEthereumBlockchain(item as Item)
        item.ethereumTransactionHash = ethreumTransactionID
      }

      await loading.dismiss()
      await this.databaseService.myItemsDatabase.saveItem(item)
    }
    catch(err){
      await loading.dismiss()
      const alert = await this.alertController.create({
        header: 'Alert!',
        message: 'An error occured while submitting the item. Please try again later',
        buttons: ['OK']
      });
      await alert.present();     
    }
    this.addItemForm.isSubmitting = false
  },
  this.addItemService.formValidators.addItemValidator
  )

  constructor(
    private toastController: ToastController, 
    private addItemService: AddItemService, 
    private databaseService: DatabaseService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  

  typeof(val: any){
    return typeof(val)
  }

  handleCategoryFieldChange(event: Event){
    const value: string = (event.target as any).value
    this.addItemForm.values.category = value
    this.addItemForm.updateErrors(true)
  }

  handleVisibilityFieldChange(event: Event){
    const value: string = (event.target as any).value
    this.addItemForm.values.visibility = value
    this.addItemForm.updateErrors(true)
  }

  updateImages(event: Array<string>){
    this.itemImages = event
  }
}
