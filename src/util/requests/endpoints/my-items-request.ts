import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { FetchItemsQueryParams } from "src/model/FetchItemsQueryParams"
import { browseItemsResponse } from "src/model/mock-api-responses/browse-items-response"
import { myItemsResponse } from "src/model/mock-api-responses/my-items-response"
import { fetchAPI } from "../../fetch-api"

export const myItemsRequest = (http: HttpClient, queryParams: FetchItemsQueryParams): Observable<typeof myItemsResponse[200]> => {
    return fetchAPI("myItems", http, "get", {
        queryParams,
        isUsingMock: false,
    })
}