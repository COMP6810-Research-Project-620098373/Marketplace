// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FetchItemsQueryParams } from "src/model/FetchItemsQueryParams";

export const environment = {
  production: false,
  // ipfsAPI: "http://localhost:5001/api/v0",
  useMockAPI: true,
  // modelPath: "assets/model/model.json",
  backend: {
    origin: "http://localhost:3000/api",
    endpoints: {
      addItem: (options?: {}) => {
        return `/item`
      },
      fetchItem: (options?: {pathParams: { itemIpfsHash: string }}) => {
        return `/item/${options?.pathParams.itemIpfsHash}`
      },
      myItems: (options?: {queryParams: FetchItemsQueryParams}) => {
        return `/my-items?mode=${options?.queryParams.mode ?? "public"}&filter=${options?.queryParams.filter}&offset=${options?.queryParams.offset}`
      },
      browseItems: (options?: {queryParams: FetchItemsQueryParams}) => {
        return `/browse-items?mode=${options?.queryParams.mode ?? "public"}&filter=${options?.queryParams.filter}&offset=${options?.queryParams.offset}&userAge=${options?.queryParams.userAge}`
      },
      wallet: (options?: {}) => {
        return `/wallet`
      },
      transactionCost: (options?: {}) => {
        return `/transaction-cost`
      },
      classifyImage: (options?: {}) => {
        return `/classify-image`
      },
      classifyText: (options?: {}) => {
        return `/classify-text`
      },
    }
    // ethereumRPC: {
    //   origin: "",
    //   endpoints: {
    //     // send_transaction: (options?: {}) => "/",
    //     get_transaction_by_hash: (options?: {}) => "/",
    //   }
    // },
    // ethereumTransactionIndexer: {
    //   origin: "",
    //   endpoints: {
    //     transactions: (options?: {pathParams: {address: string}, queryParams?: {from: number, to: number}}) => 
    //       `/addresses/${options?.pathParams.address}/transactions?from=${options?.queryParams?.from}&to=${options?.queryParams?.to}`
    //   }
    // },
    // ipfs: {
    //   origin: "",
    //   endpoints: {

    //   }
    // }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
