import { addItemRequest } from "./endpoints/add-item-request";
import { browseItemsRequest } from "./endpoints/browse-items-request";
import { classifyImageRequest } from "./endpoints/classify-image-request";
import { classifyTextRequest } from "./endpoints/classify-text-request";
import { fetchItemRequest } from "./endpoints/fetch-item-request";
import { myItemsRequest } from "./endpoints/my-items-request";
import { transactionCostRequest } from "./endpoints/transaction-cost-request";
import { getWalletRequest } from "./endpoints/wallet-request";

export const requestBuilder = {
    addItemRequest,
    fetchItemRequest,
    myItemsRequest,
    browseItemsRequest,
    getWalletRequest,
    transactionCostRequest,
    classifyImageRequest,
    classifyTextRequest,
}