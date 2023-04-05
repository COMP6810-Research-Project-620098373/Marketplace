import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { classifyImageResponse } from "src/model/mock-api-responses/classify-image-response";
import { fetchAPI } from "src/util/fetch-api";

export const classifyImageRequest = (http: HttpClient, body: {image: string}): Observable<typeof classifyImageResponse[200]> => {
    return fetchAPI("classifyImage", http, "post", {
        body,
        isUsingMock: false
    })
}