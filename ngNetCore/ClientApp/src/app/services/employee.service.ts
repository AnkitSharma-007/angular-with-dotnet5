import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { City } from '../models/city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL = '/api/Employee/';

  constructor(private http: HttpClient) {}

  getCityList(): Observable<City[]> {
    return this.http.get<City[]>(this.baseURL + 'GetCityList');
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseURL);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseURL + id);
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.baseURL, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.baseURL, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseURL + id);
  }
}
