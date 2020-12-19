import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../../core/error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EmployeeService } from './../../employee.service';
import { Employee } from './../../../core/model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input() employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  confirmSave() {
    this.confirmation.confirm({
      message: 'Are you sure you want to save?',
      accept: () => {
        if (this.employee.id) {
          this.update();
        } else {
          this.create();
        }
      }
    });
  }

  update() {
    this.employeeService.update(this.employee)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Employee updated!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  create() {
    this.employeeService.create(this.employee)
    .then(result => {
      this.employee.id = result.id;
      this.messageService.add({ severity: 'success', detail: 'Employee created!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form) {
    form.reset();

    setTimeout(function() {
      this.employee = new Employee();
    }.bind(this), 1);

    this.router.navigate(['/employees/new']);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
