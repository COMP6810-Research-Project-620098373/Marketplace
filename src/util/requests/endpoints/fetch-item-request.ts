import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { fetchItemResponse } from "src/model/mock-api-responses/fetch-item-response"
import { fetchAPI } from "../../fetch-api"

export const fetchItemRequest = (http: HttpClient, pathParams: { itemIpfsHash: string }): Observable<typeof fetchItemResponse[200]> => {
    return fetchAPI("fetchItem", http, "get", {
        pathParams,
        isUsingMock: false
    })
}