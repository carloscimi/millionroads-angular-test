import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: EmployeeSearchComponent
  },
  {
    path: 'new',
    component: EmployeeCreateComponent
  },
  {
    path: ':id',
    component: EmployeeDetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
