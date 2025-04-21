import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

const BASE_URL = 'http://localhost:3000/api/users';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public get usernameFormControl(): AbstractControl<string | null> | null {
    return this.form.get('username');
  }

  public get passwordFormControl(): AbstractControl<string | null> | null {
    return this.form.get('password');
  }

  login() {
    this.http.post(BASE_URL + '/create', {
      username: this.usernameFormControl?.value,
      password: this.passwordFormControl?.value,
    }).subscribe(x => console.log(x));
  }
}
