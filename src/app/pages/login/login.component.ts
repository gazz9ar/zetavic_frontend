import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../enviroments/enviroments';
import { LoginService } from '@buffetly/data-access';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  loginService = inject(LoginService);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get usernameControl(): AbstractControl<string | null> | null {
    return this.form.get('username');
  }

  get passwordControl(): AbstractControl<string | null> | null {
    return this.form.get('password');
  }

  login() {
    if (!this.usernameControl?.value || !this.passwordControl?.value) return;
    this.loginService.login(this.usernameControl!.value, this.passwordControl!.value).subscribe(x => console.log(x));
  }

  register() {

  }
}
