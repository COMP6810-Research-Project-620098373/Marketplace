import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { transactionCostResponse } from "src/model/mock-api-responses/transaction-cost-response"
import { fetchAPI } from "../../fetch-api"

export const transactionCostRequest = (http: HttpClient): Observable<typeof transactionCostResponse[200]> => {
    return fetchAPI("transactionCost", http, "get")
}