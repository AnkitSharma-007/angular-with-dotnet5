import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  submitted = false;

  cityList$: Observable<City[]>;

  constructor(
    private fb: FormBuilder,
    private avRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.cityList$ = this.employeeService.getCityList();

    this.employeeForm = this.fb.group({
      employeeId: 0,
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // A better reactive approach

    // this.avRoute.paramMap
    //   .pipe(
    //     switchMap((params: Params) => {
    //       this.employeeId = params.get('employeeId');
    //       return this.employeeService.getEmployeeById(this.employeeId);
    //     })
    //   )
    //   .subscribe((response: Employee) => this.employeeForm.setValue(response));

    this.avRoute.paramMap.subscribe((params: Params) => {
      this.employeeId = params.get('employeeId');
    });

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

    if (this.employeeId > 0) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  cancel(): void {
    this.navigateToFetchEmployee();
  }

  private addEmployee(): void {
    this.employeeService.saveEmployee(this.employeeForm.value).subscribe(
      () => {
        this.navigateToFetchEmployee();
      },
      (error) => console.error(error)
    );
  }

  private updateEmployee(): void {
    this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
      () => {
        this.navigateToFetchEmployee();
      },
      (error) => console.error(error)
    );
  }

  private navigateToFetchEmployee() {
    this.router.navigate(['/fetch-employee']);
  }
}
