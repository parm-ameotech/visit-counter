import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment'
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserVisitService {

  constructor(private httpSerivce: BaseService) {
  }

  MarkVisitComplete(user: any, site: any, country: any)
  {
    return this.httpSerivce.post(`${environment.api}/visit/end/`, {user: user, site: site, country: country});
  }

  StartVisitCounter(user: any, site: any, country: any)
  {
    return this.httpSerivce.post(`${environment.api}/visit/start/`, {user: user, site: site, country: country});
  }

  GetRefrealDetails(user: any)
  {
    let params = new HttpParams();
    params = params.append("referal_user", user);
    return this.httpSerivce.getWithParams(`${environment.api}/referal`, params);
  }

  GetUserVisits(conversion: any)
  {
    let params = new HttpParams();
    params = params.append("conversion", conversion);
    return this.httpSerivce.getWithParams(`${environment.api}/visits`, params);
  }
}
