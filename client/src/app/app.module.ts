import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VisitcounterComponent } from './visitcounter/visitcounter.component';
import { AdminComponent } from './admin/admin.component';
import {MatButtonToggleModule, MatGridListModule} from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent,
    VisitcounterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatGridListModule,
    AppRoutingModule,
    BlockUIModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
