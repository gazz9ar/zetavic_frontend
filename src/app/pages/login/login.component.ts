import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '@buffetly/data-access';
import { ActivatedRoute, } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { GoogleSsoComponent } from '../../ui/google-sso/google-sso.component';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { take } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  route = inject(ActivatedRoute);

  isFreeTrial = signal(false);
  isLoading = signal(true);

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  });

  get emailControl(): AbstractControl<string | null> | null {
    return this.form.get('username');
  }

  get passwordControl(): AbstractControl<string | null> | null {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.setLoginType();
  }

  login() {
    this.form.markAllAsTouched();
    if (!this.emailControl?.value || !this.passwordControl?.value) return;
    this.loginService.login(this.emailControl!.value, this.passwordControl!.value).subscribe(x => console.log(x));
  }

  private setLoginType(): void {
    this.route.queryParams
      .pipe(take(1))
      .subscribe(params => {
        if (!!params['trial']) this.isFreeTrial.set(true);
      });
  }
}
