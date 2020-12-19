import { Employee } from './../../core/model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employee = new Employee();

  constructor() { }

  ngOnInit(): void {

  }

}
