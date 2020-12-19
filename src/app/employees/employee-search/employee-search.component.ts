import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmployeeService } from './../employee.service';
import { Employee } from './../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css', './employee-search.scss']
})
export class EmployeeSearchComponent implements OnInit {

  loading = true;

  numPag: number[];
  numPagInic;

  employees: Employee[];

  @ViewChild('table', { static: true }) grid;

  constructor(
    private employeeService: EmployeeService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.search();

    if (window.innerWidth >= 768) {
      this.numPag = [10, 25, 50];
      this.numPagInic = 10;
    } else {
      this.numPag = [5, 10];
      this.numPagInic = 5;
    }
  }

  search() {
    this.employeeService.search()
      .then(result => {
        this.employees = result.employees;
      })
      .catch(erro => this.errorHandler.handle(erro))
      .finally(() => this.loading = false);
  }

  confirmDelete(employee: Employee) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(employee);
      }
    });
  }

  delete(employee: Employee) {
    this.employeeService.delete(employee.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.search();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Employee deleted!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
