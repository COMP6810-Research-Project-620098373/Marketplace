import { Injectable } from '@angular/core';

// import { IPFS, create } from 'ipfs-core';
// import * as IPFS_ROOT_TYPES from 'ipfs-core-types/src/root';
// import { BehaviorSubject, } from 'rxjs';

// import * as ipfs from "ipfs-http-client"
import { create } from 'ipfs-http-client'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  private ipfs = create({
    // url: environment.ipfsAPI
  })

  async get(ipfsHash: string, maxLength: number = 2000){
    return await this.ipfs.cat(ipfsHash, {length: maxLength})
  }

  async add(data: string){
    return (await this.ipfs.add(data)).cid
  }

  isOnline(){
    return this.ipfs.isOnline()
  }

  // private _ipfsSource = new BehaviorSubject<null | IPFS>(null);
  // private _createIPFSNodePromise: Promise<IPFS>;

  // private get ipfs() {
  //   const getter = async () => {
  //     let node = this._ipfsSource.getValue();

  //     if (node == null) {
  //       console.log("Waiting node creation...")

  //       node = await this._createIPFSNodePromise as IPFS
  //       this._ipfsSource.next(node);
  //     }

  //     return node;
  //   }

  //   return getter();
  // }

  // constructor() {
  //   console.log("Starting new node...")

  //   this._createIPFSNodePromise = create()
  // }

  // /**
  //  * @description Get the ID information about the current IPFS node
  //  * @return {Promise<IPFS_ROOT_TYPES.IDResult>}
  //  */
  // async getId(): Promise<IPFS_ROOT_TYPES.IDResult> {
  //   const node = await this.ipfs;
  //   return await node.id();
  // }

  // /**
  //  * @description Get the version information about the current IPFS node
  //  * @return {Promise<IPFS_ROOT_TYPES.VersionResult>}
  //  */
  // async getVersion(): Promise<IPFS_ROOT_TYPES.VersionResult> {
  //   const node = await this.ipfs;
  //   return await node.version();
  // }

  // /**
  //  * @description Get the status of the current IPFS node
  //  * @returns {Promise<boolean>}
  //  */
  // async getStatus(): Promise<boolean> {
  //   const node = await this.ipfs;
  //   return await node.isOnline();
  // }
}