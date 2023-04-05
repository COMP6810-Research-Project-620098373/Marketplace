import { Injectable } from '@angular/core';
import { Item } from 'src/model/Item';
import * as Pouch from "pouchdb"


const PouchDB = window["PouchDB"] as typeof Pouch
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  itemsDatabase: ItemDatabase = new ItemDatabase()
  myItemsDatabase: MyItemsDatabase = new MyItemsDatabase()
  
  constructor() { 
  }
  
}

class ItemDatabase {
  private itemsDatabase = new PouchDB("items", { auto_compaction: true })

  async saveItem(item: Item){
    return new Promise((resolve, reject) => {
      this.itemsDatabase.put(item).then(() => {
        resolve(null)
      }).catch((err: any) => {
        reject(err)
      })

      this.itemsDatabase.find()
    })
  }

  async getItem(itemID: string){
    
  }

  // async fetchItem(itemID: string){
    
  // }  

  async deleteItem(itemID: string){
    
  }  
}


class MyItemsDatabase {
  private itemsDatabase = new PouchDB("my_items", { auto_compaction: true })

  async saveItem(item: Item){
    return new Promise((resolve, reject) => {
      this.itemsDatabase.put(item).then(() => {
        resolve(null)
      }).catch((err: any) => {
        reject(err)
      })

      this.itemsDatabase.find()
    })
  }

  async getItem(itemID: string){
    
  }

  // async fetchItem(itemID: string){
    
  // }  

  async deleteItem(itemID: string){
    
  }  
}