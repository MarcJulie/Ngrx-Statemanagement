import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Employee[]>(this.apiUrl+'employee');
  }

  Get(empId: number) {
    return this.http.get<Employee>(this.apiUrl + 'employee' + empId);
  }

  Create(data: Employee) {
    return this.http.post(this.apiUrl+'add_employee/', data);
  }

  Update(data: Employee) {
    return this.http.put(this.apiUrl + 'edit_employee/' + data.id, data);
  }

  Delete(empId: number) {
    return this.http.delete(this.apiUrl + 'delete_employee/' + empId);
  }
}
