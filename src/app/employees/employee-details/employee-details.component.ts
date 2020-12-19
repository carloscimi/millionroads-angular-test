import { Employee } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmployeeService } from './../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.loadEmployee(id);
    }
  }

  loadEmployee(codigo: number) {
    this.employeeService.searchById(codigo)
      .then(employee => {
        this.employee = employee;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
