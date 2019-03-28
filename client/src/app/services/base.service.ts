import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(private http: HttpClient) {
    }

    /**
     * 
     * @param url relative url of the api
     * @param body body or payload to post to api
     * @param apiBaseUrl Currently this service auto used base url from environment variable
     * If we need to override this then pass that url here.
     */
    post(url, body: any) {
        return this.http.post(url, body).toPromise();
    }

    /**
     * 
     * @param url relative url of the api
     * @param apiBaseUrl Currently this service auto used base url from environment variable
     * If we need to override this then pass that url here.
     * @param hard_refresh need a hard refresh on request, service used to cache request automatically
     * if need to re-cache it by getting data from server.
     * @param no_cahce If you don't need to cache request.
     */
    get(url) {
        return this.http.get(url).toPromise();
    }

    /**
     * 
     * @param url relative url of the api
     * @param params params to post with url
     * @param apiBaseUrl  Currently this service auto used base url from environment variable
     * If we need to override this then pass that url here.
     * @param hard_refresh need a hard refresh on request, service used to cache request automatically
     * if need to re-cache it by getting data from server.
     * @param no_cahce If you don't need to cache request.
     */
    getWithParams(url, params: HttpParams) {
        return this.http.get(url, { params: params }).toPromise();
    }
}
