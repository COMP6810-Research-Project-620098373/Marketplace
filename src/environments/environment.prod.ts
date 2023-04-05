import { FetchItemsQueryParams } from "src/model/FetchItemsQueryParams";

export const environment = {
  production: true,
  // ipfsAPI: "http://localhost:5001/api/v0",
  useMockAPI: false,
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
        return `/browse-items?mode=${options?.queryParams.mode ?? "public"}&filter=${options?.queryParams.filter}&offset=${options?.queryParams.offset}`
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
  }  
};
