import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { requestBuilder } from 'src/util/requests/request-builder';
import Wallet from "ethereumjs-wallet"

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  constructor() { }

  generatePublicKey(): {
    publicKey: string,
    privateKey: string,
  } {
    const EthWallet = Wallet.generate()
    return {
      publicKey: EthWallet.getAddressString(),
      privateKey: EthWallet.getPrivateKeyString(),
    }
  }

  // getTransactionHashesOfAddress$(http: HttpClient, ethereumAddress: string, from: number, to: number) {
  //   return requestBuilder.ethereumTransactionIndexer.getTransactionHashesOfAddress(http, {
  //     ethereumAddress,
  //     from,
  //     to,
  //   })
  // }

  // getTransactionByHash$(http: HttpClient, ethereumTransactionHash: string) {
  //   return requestBuilder.ethereumRPC.getTransaction(http, {
  //     ethereumTransactionHash,
  //   })
  // }

}
