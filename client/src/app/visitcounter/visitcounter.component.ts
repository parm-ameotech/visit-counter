import { Component, OnInit } from '@angular/core';
import { UserVisitService } from '../services/user-visit.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-visitcounter',
  templateUrl: './visitcounter.component.html',
  styleUrls: ['./visitcounter.component.css']
})
export class VisitcounterComponent implements OnInit {
  refrel: any;

  constructor(private userVisitService: UserVisitService) { }
  site: any;
  user: any;
  counterInterval: any;
  counter: any = 20;
  counterHit: boolean;
  ngOnInit() {
    
    /**Read params from url */
    this.site = this.getParamValueQueryString("referral_site");
    this.user = this.getParamValueQueryString("referral_user");
    
    /**If we got both params then issue start visit and start 20 seconds counter */
    if (this.site && this.user)
    {
      this.getRefrel(this.user);
    }   
  }

  /**
   * Start a ui counter that will start from 20
   * and goes down to 0
   */
  startUICounter()
  {
    this.counterInterval = setInterval(() => {
      this.counter = this.counter - 1;
      if (this.counter <= 0)
      {
        clearInterval(this.counterInterval);
      }
    }, 1000);
  }

  /**
   * Wait for 20 seconds counter to finish and make user
   * visit complete in DB
   */
  waitForCounterToFinishAndMarkVisitComplete()
  {
    setTimeout(() => {
      this.markVisitComplete(this.site, this.user);
    }, 20000);
  }

  /**
   * As soon as user visit site make that visit in DB
   * @param site 
   * @param user 
   */
  startVisit(site: any, user: any)
  {
    this.userVisitService.StartVisitCounter(user, site, this.refrel.country);
  }

  /**
   * Mark a visit complete in DB
   * @param site 
   * @param user 
   */
  markVisitComplete(site: any, user: any)
  {
    this.userVisitService.MarkVisitComplete(user, site, this.refrel.country).then(()=>{
      this.counterHit = true;
    });
  }

  /**
   * Get user detail from DB
   * @param user 
   */
  getRefrel(user: any)
  {
    this.userVisitService.GetRefrealDetails(user).then((res: any) => {
      this.refrel = res;
      this.startVisit(this.site, this.user);
      this.startUICounter();
      this.waitForCounterToFinishAndMarkVisitComplete();
    });
  }

  /**
   * Read query string from url
   * @param paramName 
   */
  getParamValueQueryString( paramName ) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

}
