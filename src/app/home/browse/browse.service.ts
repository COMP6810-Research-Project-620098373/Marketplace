import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchItemsQueryParams } from 'src/model/FetchItemsQueryParams';
import { requestBuilder } from 'src/util/requests/request-builder';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {

  constructor(private httpClient: HttpClient) { }

  items$(queryParams: FetchItemsQueryParams){
    return requestBuilder.browseItemsRequest(this.httpClient, queryParams)
  }
}
