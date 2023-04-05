import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IpfsService } from 'src/external-services/ipfs.service';
import { Item } from 'src/model/Item';
import { requestBuilder } from 'src/util/requests/request-builder';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItem$(itemIpfsHash: string): Observable<Item>{
    return requestBuilder.fetchItemRequest(this.httpClient, {
      itemIpfsHash,
    })
  }

  classifyItemImage$(imageUrlOrBase64: string): Observable<{
      className: string;
      probability: number;
  }[]>{
    return requestBuilder.classifyImageRequest(this.httpClient, {
      image: imageUrlOrBase64
    })
  }
}
