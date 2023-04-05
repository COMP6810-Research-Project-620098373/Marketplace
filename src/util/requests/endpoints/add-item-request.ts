import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Item } from "src/model/Item"
import { addItemResponse } from "src/model/mock-api-responses/add-item-response"
import { fetchAPI } from "../../fetch-api"

export const addItemRequest = (http: HttpClient, body: {item: Item}): Observable<typeof addItemResponse[200]> => {
    return fetchAPI("addItem", http, "get", {
        body,
    })
}