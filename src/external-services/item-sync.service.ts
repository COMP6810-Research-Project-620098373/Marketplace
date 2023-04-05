import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { environment } from 'src/environments/environment';
import { HexConverter } from 'src/util/converters/hex-converter';
import { DatabaseService } from './database.service';
import { EthereumService } from './ethereum.service';
import { IpfsService } from './ipfs.service';

@Injectable({
  providedIn: 'root'
})
export class ItemSyncService {

  private daemon: undefined | NodeJS.Timer

  constructor(
    private http: HttpClient,
    private ipfsService: IpfsService,
    private ethereumService: EthereumService,
    private databaseService: DatabaseService,
  ){}

  stop(){
    clearInterval(this.daemon)
  }

  async start(){
    this.stop()
    await this.syncItems()
    this.daemon = this.createDaemon()
  }

  private createDaemon(){
    return setInterval(() => {
      this.syncItems()
    }, 60000)
  }
  
  private async syncItems(){
    const lengthOfItemDatabase: number = await this.databaseService.itemsDatabase.getLength()
    let itemTransactionHashes: Array<string> | undefined = undefined
    const transactionHashesRequest = this.ethereumService.getTransactionHashesOfAddress$(this.http, environment.ethereumAddress, lengthOfItemDatabase, lengthOfItemDatabase + 30).subscribe(transactionHashes => {
      transactionHashesRequest.unsubscribe()
      itemTransactionHashes = transactionHashes
    })
    if(itemTransactionHashes === undefined){
      throw new Error("failed to get transaction hashes of address")
    }
    const batchArray: Array<Promise<null>> = []
    for(let x = 0; x < (itemTransactionHashes as Array<string>).length; x++){
      const transactionHash = itemTransactionHashes[x]
      batchArray.push(
        new Promise((resolve, reject) => {
          try{
            const transactionRequest = this.ethereumService.getTransactionByHash$(this.http, transactionHash).subscribe(async transaction => {
              transactionRequest.unsubscribe()
              const ipfsHash: string = HexConverter.hexToAscii(transaction.result.input)
              const itemData: AsyncIterable<Uint8Array> = await this.ipfsService.get(ipfsHash)
              // TODO: Address this issue
              //@ts-ignore
              const item: Item = JSON.parse(new TextDecoder().decode(itemData))
              this.databaseService.itemsDatabase.saveItem(item).then(res => resolve(null)).catch(err => reject(err))
            })
          }
          catch(err){
            reject(err)
          }
        })
      )
      if((itemTransactionHashes as Array<string>).length - 1 === x){
        batchArray.length += 5 % batchArray.length
      }      
      if(batchArray.length >= 5){
        await Promise.allSettled(batchArray)
        batchArray.length = 0
      }      
    }
  }
}
