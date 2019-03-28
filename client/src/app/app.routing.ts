import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';  
import { VisitcounterComponent } from './visitcounter/visitcounter.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [  
    { path: '', pathMatch: 'full', redirectTo: 'visit' },
    { path: 'visit', component: VisitcounterComponent },
    { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
