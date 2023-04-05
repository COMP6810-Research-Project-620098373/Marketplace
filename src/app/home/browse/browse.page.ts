import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/model/Item';
import { ItemCategories } from 'src/model/ItemCategories';
import { RouteMapper } from 'src/model/RouteMapper';
import { Visibility } from 'src/model/Visibility';
import { BrowseService } from './browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {

  searchFilter: string = ""
  items?: Array<Item> | null

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private browseService: BrowseService) { 
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe( queryParams => {
      this.searchFilter = queryParams.get("search") === null ? "" : queryParams.get("search") as string
      if((this.items === undefined || this.items === null) && queryParams.get("search") === null){
        this.search(this.searchFilter)
      }
    })
  }

  async onIonInfinite(event: Event){
    this.items = this.items?.concat(await this.loadItems(this.searchFilter))
  }

  async refresh(){
    await new Promise(resolve => setTimeout(resolve, 1200))
    this.items = undefined
    this.items = await this.loadItems("")
  }

  private async loadItems(searchFilter: string): Promise<Array<Item>>{
    return await new Promise((resolve, reject) => {
      try{

        const userAge: number = Math.abs(
          (new Date(
            Date.now() - new Date(localStorage.getItem("monthOfBirth") as string).getTime()
          ).getUTCFullYear()) - 1970
        )

        const itemsRequest = this.browseService.items$({
          mode: "public",
          offset: this.items !== undefined && this.items !== null ? this.items.length : 0,
          filter: searchFilter,
          userAge,
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

  viewItem(item: Item){
    this.router.navigateByUrl(RouteMapper.item + "/" + item.ipfsHash, {state: item})
    this.activatedRoute
  }
}
