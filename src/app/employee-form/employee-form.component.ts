import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  private employeesService = inject(EmployeesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    salary: 0,
  };
  errorMessage = '';
  isEditing = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if (id) {
        this.isEditing = true;
        this.employeesService.getEmployeeById(Number(id)).subscribe({
          next: (res) => {
            this.employee = res;
          },
          error: (err) => {
            this.errorMessage = `Error ${err.status}: Error occured while fetching the employee`;
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      // UPDATING
      this.employeesService.updateEmployee(this.employee).subscribe({
        next: (res) => {
          console.log('Employee updated successfully.', res);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error ${err.status}: Error occured during updating!`;
        },
      });
    } else {
      // CREATING
      this.employeesService.createEmployee(this.employee).subscribe({
        next: (res) => {
          console.log('Employee created successfully.', res);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error ${err.status}: Error occured during creating!`;
        },
      });
    }
  }
}
