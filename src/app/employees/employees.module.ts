import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { EmployeeFormComponent } from './common/employee-form/employee-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    NgxCurrencyModule,
    InputMaskModule,

    SharedModule,
    EmployeesRoutingModule
  ],
  declarations: [
    EmployeeSearchComponent,
    EmployeeCreateComponent,
    EmployeeDetailsComponent,
    EmployeeFormComponent
  ],
  exports: []
})
export class EmployeesModule { }
