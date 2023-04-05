import { Injectable } from '@angular/core';
import { Validator } from 'fluentvalidation-ts';
import { IpfsService } from 'src/external-services/ipfs.service';
import { Item } from 'src/model/Item';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  formValidators = {
    addItemValidator: new AddItemValidator()
  }
  constructor(private ipfsService: IpfsService) { }

  async submitItemToIPFS(item: Item): Promise<string>{
    // TODO: 
    return ""
  }

  async submitItemToEthereumBlockchain(item: Item): Promise<string>{
    // TODO: 
    return ""
  }
}

class AddItemValidator extends Validator<{
  category: string,
  visibility: string,
  title: string,
  cost: string,
  contact: string,
}> {

  constructor(){
    super()
    
    this.ruleFor("category")
      .notEmpty()
      .withMessage("This field is required")
    
    this.ruleFor("visibility")
      .notEmpty()
      .withMessage("This field is required")
    
    this.ruleFor("title")
      .notEmpty()
      .withMessage("This field is required")
    
    this.ruleFor("cost")
      .notEmpty()
      .withMessage("This field is required")
    
    this.ruleFor("contact")
      .notEmpty()
      .withMessage("This field is required")
      .maxLength(30)
    
  }

}