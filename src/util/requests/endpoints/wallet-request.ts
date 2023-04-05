import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { walletResponse } from "src/model/mock-api-responses/wallet-response"
import { fetchAPI } from "../../fetch-api"

export const getWalletRequest = (http: HttpClient): Observable<typeof walletResponse[200]> => {
    return fetchAPI("wallet", http, "get")
}