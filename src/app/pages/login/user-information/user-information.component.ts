import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';

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

  form = this.fb.group({
    fullname: ['', Validators.required],
    company: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
    user_type: ['', Validators.required],
  });

  selectedUserType = signal<CompanyType>('ceo');

  selectUserType(type: CompanyType) {
    this.selectedUserType.set(type)
  }
}
