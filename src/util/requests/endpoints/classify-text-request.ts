import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { classifyTextResponse } from "src/model/mock-api-responses/classify-text-response";
import { fetchAPI } from "src/util/fetch-api";


export const classifyTextRequest = (http: HttpClient, body: {text: string}): Observable<typeof classifyTextResponse[200]> => {
    return fetchAPI("classifyText", http, "post", {
        body,
        isUsingMock: false,
    })
}