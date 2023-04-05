import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/model/Item';
import { ItemCategories } from 'src/model/ItemCategories';
import { RouteMapper } from 'src/model/RouteMapper';
import { Visibility } from 'src/model/Visibility';
import { MyItemsService } from './my-items.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.page.html',
  styleUrls: ['./my-items.page.scss'],
})
export class MyItemsPage implements OnInit {

  searchFilter: string = ""
  items?: Array<Item> | null
  // items: Array<Item> = [
  //  {
  //   title: "Item",
  //   cost: 1222,
  //   ipfsHash:"e32233",
  //   visibility: Visibility.Public,
  //   ethereumTransactionHash: "",
  //   images: [],
  //   contact: "",
  //   category: ItemCategories['All Departments'],
  //   description: "",
  //  },

  //  {
  //   title: "Item2",
  //   cost: 1222,
  //   ipfsHash:"",
  //   visibility: Visibility.Public,
  //   ethereumTransactionHash: null,
  //   images: [],
  //   contact: "",
  //   category: ItemCategories['All Departments'],
  //   description: "",
  //  },

  //  {
  //   title: "Item3",
  //   cost: 1222,
  //   ipfsHash:"",
  //   visibility: Visibility.Private,
  //   ethereumTransactionHash: null,
  //   images: [],
  //   contact: "",
  //   category: ItemCategories['All Departments'],
  //   description: "",
  //  }   
  // ]

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private myItemsService: MyItemsService) { 
    // this.router.events.subscribe((event: any) => {
    //   let r = this.activatedRoute;
    //   while (r.firstChild) {
    //       r = r.firstChild
    //   }
    //   r.params.subscribe(params => {
    //       console.log(params);
    //   });
    // console.log(this.activatedRoute.paramMap)
    // })
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe( queryParams => {
      this.searchFilter = queryParams.get("search") === null ? "" : queryParams.get("search") as string
      if((this.items === undefined || this.items === null) && queryParams.get("search") === null){
        this.search(this.searchFilter)
      }
    })    
  }

  goToAddItemPage(){
    this.router.navigateByUrl(RouteMapper.addItem)
  }

  onIonInfinite(event: Event){

  }

  viewItem(item: Item){
    this.router.navigate([RouteMapper.item, item.ipfsHash], {state: item})
    this.activatedRoute
    // this.router.navu(RouteMapper.item + "/" + item.ipfsHash)
  }

  isPubliclyVisibleItem(item: Item){
    return item.visibility === Visibility.Public
  }

  async refresh(){
    await new Promise(resolve => setTimeout(resolve, 1200))
    this.items = undefined
    this.items = await this.loadItems("")
  }
  
  private async loadItems(searchFilter: string): Promise<Array<Item>>{
    return await new Promise((resolve, reject) => {
      try{
        const itemsRequest = this.myItemsService.items$({
          mode: "public",
          offset: this.items !== undefined && this.items !== null ? this.items.length : 0,
          filter: searchFilter,
        }).subscribe( items => {
          itemsRequest.unsubscribe()
          // this.items = this.items === undefined || this.items === null ? items : this.items.concat(items)
          resolve(items)
        })
      }
      catch(err){
        reject(err)
      }
    })
  }

  private async search(searchFilter: string){
    this.items = undefined
    // this.loadItems(searchQuery)
    try{
      const searchQuery: string = searchFilter
      // TODO: query database and set this.items
      this.items = await this.loadItems(searchFilter)
    }
    catch(err){
      this.items = null
    }
  }
}
