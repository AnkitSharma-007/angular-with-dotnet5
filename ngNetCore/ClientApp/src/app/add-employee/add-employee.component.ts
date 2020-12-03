import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../models/city';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  title = 'Create';
  employeeId: number;
  errorMessage: any;
  cityList: City[];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private avRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    if (this.avRoute.snapshot.params.id) {
      this.employeeId = this.avRoute.snapshot.params.id;
    }

    this.employeeForm = this.fb.group({
      employeeId: 0,
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchCityList();

    if (this.employeeId > 0) {
      this.title = 'Edit';
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (response: Employee) => {
          this.employeeForm.setValue(response);
        },
        (error) => console.error(error)
      );
    }
  }

  get registerFormControl() {
    return this.employeeForm.controls;
  }

  save(): void {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this.addEmployee();
    } else if (this.title === 'Edit') {
      this.updateEmployee();
    }
  }

  cancel(): void {
    this.router.navigate(['/fetch-employee']);
  }

  private fetchCityList(): void {
    this.employeeService
      .getCityList()
      .subscribe((data: City[]) => (this.cityList = data));
  }

  private addEmployee(): void {
    this.employeeService.saveEmployee(this.employeeForm.value).subscribe(
      () => {
        this.router.navigate(['/fetch-employee']);
      },
      (error) => console.error(error)
    );
  }

  private updateEmployee(): void {
    this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
      () => {
        this.router.navigate(['/fetch-employee']);
      },
      (error) => console.error(error)
    );
  }
}
