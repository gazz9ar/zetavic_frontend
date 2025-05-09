import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse) {
  let msg = 'Unknown error';
  if (error.error instanceof ErrorEvent) {
    // Client‑side
    msg = `Error: ${error.error.message}`;
  } else {
    // Server‑side
    msg = `Error ${error.status}: ${error.message}`;
  }
  return throwError(() => new Error(msg));
}