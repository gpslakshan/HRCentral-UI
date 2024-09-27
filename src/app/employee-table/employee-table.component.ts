import { Component, inject, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
})
export class EmployeeTableComponent implements OnInit {
  private employeesService = inject(EmployeesService);
  private router = inject(Router);
  employees: Employee[] = [];

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateEmployee(id: number) {
    this.router.navigateByUrl(`/update/${id}`);
  }

  deleteEmployee(id: number) {
    this.employeesService.deleteEmplloyee(id).subscribe({
      next: () => {
        console.log('Successfully deleted the employee');
        this.employees = this.employees.filter((e) => e.id !== id);
      },
      error: (err) => {
        console.error('Something went wrong', err);
      },
    });
  }
}
