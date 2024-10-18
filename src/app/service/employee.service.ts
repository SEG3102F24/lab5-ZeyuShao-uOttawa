import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Employee } from "../model/employee";
import { EmployeeDbService } from './firestore/employee-db.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);
  private employeeDb: EmployeeDbService = inject(EmployeeDbService);

  constructor() {
    this.employeeDb.getEmployees().subscribe(employees => {
      this.employees$.next(employees);
    });
  }

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  addEmployee(employee: Employee) {
    this.employeeDb.createEmployee(employee);
    return true;
  }
}
