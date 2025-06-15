import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { Router } from '@angular/router';

export type CompanyType = 'ceo' | 'marketing' | 'developer' | 'other';

@Component({
  selector: 'app-user-information',
  imports: [MatFormField, ReactiveFormsModule, MatLabel, MatError, MatInputModule, MatButtonModule, NgClass],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInformationComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  form = this.fb.group({
    fullname: ['', Validators.required],
    company_name: ['', Validators.required],
  });

  newUserEmail = signal<string | undefined>(undefined);
  selectedUserType = signal<CompanyType>('ceo');

  constructor() {
    this.setUserEmail();
  }

  setUserEmail() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.newUserEmail.set(state?.['email']);
  }

  selectUserType(type: CompanyType) {
    this.selectedUserType.set(type)
  }
}
