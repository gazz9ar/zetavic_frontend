// upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '@buffetly/utils';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly uploadUrl = 'http://localhost:3000/api/guests/upload/csv';

  constructor(private http: HttpClient) { }

  uploadCsv(file: File): Observable<HttpEvent<any>> {
    const form = new FormData();
    form.append('file', file, file.name);

    return this.http.post(this.uploadUrl, form, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(handleError)
    );
  }


}
