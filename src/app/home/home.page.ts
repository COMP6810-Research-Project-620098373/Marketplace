import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteMapper } from 'src/model/RouteMapper';
// import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('homePageDobSelector', {read: ElementRef}) homePageDobSelector?: ElementRef

  browserRoute = RouteMapper.browse
  myItemsRoute = RouteMapper.myItems
  accountRoute = RouteMapper.account
  dobSelected: boolean = false
  isDobModalOpen: boolean = localStorage.getItem("monthOfBirth") === null

  // footerItems = [
  //   {
  //     icon: "home-outline",
  //     label: "Home",
  //     route: "",
  //   },
  //   {
  //     icon: "pricetags-outline",
  //     label: "My Items",
  //     route: "",
  //   },
  // ]

  searchQuery: string = ""

  searchOn: boolean = false

  items = [
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
  ]

  constructor(private router: Router, private activatedRoute: ActivatedRoute ) {
  }

  onIonInfinite(event: Event){

  }

  goToBrowse(){
    this.router.navigateByUrl(this.browserRoute)
  }

  goToMyitems(){
    this.router.navigateByUrl(this.myItemsRoute)
  }

  goToAccount(){
    this.router.navigateByUrl(this.accountRoute)
  }

  toggleSearch(){
    this.searchOn = true
    setTimeout(() => {
      (document.querySelector("#searchBar > div > input") as any).focus()
    }, 400)

  }

  // setSearchQuery(event: Event){
  //   this.searchQuery = (event.target as HTMLInputElement).value
  // }

  search(event: Event) {
    const query: string = (event.target as HTMLInputElement).value
    if(query.indexOf("ipfs://") === 0 && query.slice(7).length === 46){
      this.router.navigate([RouteMapper.item, query.slice(7)])
      return
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: query === "" ? {} : {
        search: query,
      }
    })
  }

  clearSearch(){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {}
    }) 
  }

  toggleModal(){
  }

  isBrowseTab(){
    const isUsingHashingRoutingStrat: boolean = location.href.split("/#/").length > 1
    const splittedHashingRoutingStratPath = location.href.split("/#/")
    return isUsingHashingRoutingStrat ? splittedHashingRoutingStratPath[1].indexOf(RouteMapper.browse) === 0 : window.location.pathname.slice(1).indexOf(RouteMapper.browse) === 0
  }

  isMyItemsTab(){
    const isUsingHashingRoutingStrat: boolean = location.href.split("/#/").length > 1
    const splittedHashingRoutingStratPath = location.href.split("/#/")
    return isUsingHashingRoutingStrat ? splittedHashingRoutingStratPath[1].indexOf(RouteMapper.myItems) === 0 : window.location.pathname.slice(1).indexOf(RouteMapper.myItems) === 0    
  }

  isAccountTab(){
    const isUsingHashingRoutingStrat: boolean = location.href.split("/#/").length > 1
    const splittedHashingRoutingStratPath = location.href.split("/#/")
    return isUsingHashingRoutingStrat ? splittedHashingRoutingStratPath[1].indexOf(RouteMapper.account) === 0 : window.location.pathname.slice(1).indexOf(RouteMapper.account) === 0
  }

  getIsModalOpen(){
    return localStorage.getItem("monthOfBirth") === null
  }

  getMaxModalYear(){
    const date = new Date()
    date.setFullYear(date.getFullYear() - 10)
    date.setMonth(11)
    return date.toISOString()
  }

  setMonthOfBirth(){

  }

  confirmDateOfBirth(){
    document.querySelector("#home-page--dob-selector")
    const selectedDob: string = (this.homePageDobSelector?.nativeElement as HTMLInputElement).value ?? this.getMaxModalYear()
    localStorage.setItem("monthOfBirth", selectedDob)
    this.isDobModalOpen = false
    console.log(this.isDobModalOpen)
  }
}
