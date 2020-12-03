import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-fetch-employee',
  templateUrl: './fetch-employee.component.html',
  styleUrls: ['./fetch-employee.component.scss'],
})
export class FetchEmployeeComponent implements OnInit {
  public employees: Employee[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((empData) => (this.employees = empData));
  }

  delete(employeeID): void {
    const ans = confirm(
      'Do you want to delete the employee with Id: ' + employeeID
    );
    if (ans) {
      this.employeeService.deleteEmployee(employeeID).subscribe(
        () => {
          this.getEmployees();
        },
        (error) => console.error(error)
      );
    }
  }
}
