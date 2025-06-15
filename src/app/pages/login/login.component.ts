import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '@buffetly/data-access';
import { ActivatedRoute, Router, } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { GoogleSsoComponent } from '../../ui/google-sso/google-sso.component';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, of, take } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GooglePayload } from '@buffetly/utils';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    GoogleSsoComponent,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);

  isFreeTrial = signal(false);
  isLoading = signal(true);
  showTraditionalGoogleSignIn = signal(false)

  form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  });

  get emailControl(): AbstractControl<string | null> | null {
    return this.form.get('email');
  }

  get passwordControl(): AbstractControl<string | null> | null {
    return this.form.get('password');
  }

  get termsControl(): AbstractControl<boolean | null> | null {
    return this.form.get('terms');
  }

  ngOnInit(): void {
    this.setLoginType();
  }

  login(googlePayload?: GooglePayload) {
    if (!!googlePayload) {
      // this.loginService.googleLogin(googlePayload)
    } else {
      this.form.markAllAsTouched();
      if (!this.emailControl?.value || !this.passwordControl?.value || !this.termsControl?.value) return;

      this.loginService.attempt(this.emailControl?.value ?? '')
        .pipe(
          catchError(() => {
            this.showFirstTimerSnackbar();
            this.router.navigate(['login', 'user-information'], {
              state: {
                email: this.emailControl?.value,
              }
            });
            return of(undefined);
          })
        )
        .subscribe(x => console.log(x));
    }
  }

  private showFirstTimerSnackbar() {
    this._snackBar.open("We detected you don't have an account, start your free trial now!", 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private setLoginType(): void {
    this.route.queryParams
      .pipe(take(1))
      .subscribe(params => {
        if (!!params['trial']) this.isFreeTrial.set(true);
      });
  }
}
