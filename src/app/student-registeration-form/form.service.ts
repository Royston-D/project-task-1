import { Injectable } from '@angular/core';
import { studentRegisteration } from './student-registeration.modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  studentList: any[] = [];

  private apiURL: string = 'http://localhost:3000/students';
  constructor(private _http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }

  submit(studentForm: studentRegisteration): void {
    this.studentList.push(studentForm);
    this._http
      .post<any>('http://localhost:3000/students', studentForm)
      .subscribe(
        (res) => {
          console.log('data posted success', res);
        },
        (error) => {
          console.log('err', error);
        }
      );
  }

  getDataFromServer(): Observable<any> {
    const v1 = this._http.get(this.apiURL);
    const v2 = v1.subscribe((res) => {
      this.studentList.push(res), console.log(res);
    });
    return this._http.get(this.apiURL);
  }

  fetchData() {
    this.getDataFromServer().subscribe((res: any[]) => {
      res.forEach((std) => {
        this.studentList.push(std);
        console.log(std);
      });
    });
  }
}
