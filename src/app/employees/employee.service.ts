import { Employee } from './../core/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class EmployeeService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/api/v1`;
  }

  search(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/employees`)
      .toPromise()
      .then(response => {

        const employees = response.data;

        employees.forEach(e => {
          this.populateImage(e);
        });

        this.populateImage(employees);

        const result = {
          employees,
          total: response.totalElements
        };

        return result;
      });
  }

  searchById(id: number): Promise<Employee> {
    return this.http.get<any>(`${this.apiUrl}/employee/${id}`)
      .toPromise()
      .then(response => {
        const employee = response.data;

        this.populateImage(employee);

        return employee;
      });
  }

  create(employee: Employee) {
    return this.http.post<any>(`${this.apiUrl}/create`, JSON.stringify(employee))
      .toPromise()
      .then(result => {
        return result.data;
      });
  }

  update(employee: Employee) {
    return this.http.put<Employee>(`${this.apiUrl}/update/${employee.id}`, JSON.stringify(employee))
      .toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
      .toPromise()
      .then(() => null);
  }


  populateImage(e: Employee) {
    if (!e.profile_image) {
      e.profile_image = `https://randomuser.me/api/portraits/men/${e.id}.jpg`;
    }
  }

}
