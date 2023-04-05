import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { addItemResponse } from "src/model/mock-api-responses/add-item-response";
import { browseItemsResponse } from "src/model/mock-api-responses/browse-items-response";
import { fetchItemResponse } from "src/model/mock-api-responses/fetch-item-response";
import { myItemsResponse } from "src/model/mock-api-responses/my-items-response";
import { transactionCostResponse } from "src/model/mock-api-responses/transaction-cost-response";
import { walletResponse } from "src/model/mock-api-responses/wallet-response";

export const fetchAPI = <T>(
    endpoint: keyof typeof environment.backend.endpoints,
    http: HttpClient, 
    method: "get" | "post" | "put" | "delete",
    options?:Partial<{
        body: any,
        queryParams: any,
        pathParams: any
        headers: HttpHeaders | {
            [header: string]: string | string[];
        },
        isUsingMock: boolean,
        mockApiResponseTime: number
        mockApiResponseStatusCode: 200 | 201 | 500
    }>
): Observable<T> => {

    if(options){
        options.isUsingMock = options.isUsingMock ?? environment.useMockAPI
        options.mockApiResponseStatusCode = options.mockApiResponseStatusCode ?? 200
        if(options.pathParams === undefined){
            options.pathParams = {} 
        }
    }

    const mockApiResponseTime: number = options?.mockApiResponseTime != null ? options?.mockApiResponseTime : 1000
    const mockApiResponseStatusCode = options?.mockApiResponseStatusCode ?? 200

    if(options?.isUsingMock === true){
        function throwBadEndpointPath(p: never): never;
        function throwBadEndpointPath(p: keyof typeof environment.backend.endpoints) {
            throw new Error('Endpoint handling was not implemented for mock');
        }

        const observable = new Observable((observer) => {
            switch(endpoint){
                case "addItem":
                    setTimeout(() => observer.next(addItemResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break
                case "fetchItem":
                    setTimeout(() => observer.next(fetchItemResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break
                case "myItems":
                    setTimeout(() => observer.next(myItemsResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break
                case "browseItems":
                    setTimeout(() => observer.next(browseItemsResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break
                case "wallet":
                    setTimeout(() => observer.next(walletResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break
                case "transactionCost":
                    setTimeout(() => observer.next(transactionCostResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break
                case "classifyImage":
                    setTimeout(() => observer.next(transactionCostResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break
                case "classifyText":
                    setTimeout(() => observer.next(transactionCostResponse[mockApiResponseStatusCode]), mockApiResponseTime)
                    break                    
                default:
                    throwBadEndpointPath(endpoint)
            }
        })
        const result: Observable<any> = observable
        return result
    }    
    // TODO: 
    
    // const endpointWithParams: string = environment.backend.endpoints[endpoint]({
    //     pathParams: options?.pathParams,
    //     queryParams: options?.queryParams,
    // })
    const endpointWithParams: string = environment.backend.endpoints[endpoint]({
        queryParams: options?.queryParams,
        pathParams: options?.pathParams
    })
    const url = environment.backend.origin+endpointWithParams
    const headers = options?.headers
    const body = options?.body

    switch(method){
        case "get":
            return http.get<T>(url,  {
                headers,
                responseType: "json",
            })  
        case "post":
            return http.post<T>(url, body, {
                headers,
                responseType: 'json',
            })            
        case "put":
            return http.put<T>(url, body, {
                headers,
                responseType: 'json',
            })  
        case "delete":
            return http.delete<T>(url, {
                headers,
                responseType: 'json',
            })  
    }
}