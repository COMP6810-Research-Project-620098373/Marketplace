import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { FetchItemsQueryParams } from "src/model/FetchItemsQueryParams"
import { browseItemsResponse } from "src/model/mock-api-responses/browse-items-response"
import { fetchAPI } from "../../fetch-api"

export const browseItemsRequest = (http: HttpClient, queryParams: FetchItemsQueryParams): Observable<typeof browseItemsResponse[200]> => {
    return fetchAPI("browseItems", http, "get", {
        queryParams,
        isUsingMock: false
    })
}