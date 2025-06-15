import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-information',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './signup-information.component.html',
  styleUrl: './signup-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupInformationComponent {
  router = inject(Router);
  trialFeatures = signal([
    'Full access to premium features',
    'Up to 1.000 thousand users withtou additional cost',
    'Customer support through email and chat',
    "No compromise - Stop using if you didn't like it",
  ]);

  navigateToPlatform(): void {
    this.router.navigate(['platform']);
  }
}
