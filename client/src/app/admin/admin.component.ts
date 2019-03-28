import { Component, OnInit } from '@angular/core';
import { UserVisitService } from '../services/user-visit.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  visits: any[];
  @BlockUI() blockUI: NgBlockUI;
  constructor(private userVisitService: UserVisitService) { }

  ngOnInit() {
    this.getUserVisits("all");
  }

  private getUserVisits(conversion) {
    this.blockUI.start('Loading...');
    this.userVisitService.GetUserVisits(conversion).then((res: any[]) => {
      this.visits = res;
      this.blockUI.stop();
    }, () => {
      this.blockUI.stop();
    });
  }
}
