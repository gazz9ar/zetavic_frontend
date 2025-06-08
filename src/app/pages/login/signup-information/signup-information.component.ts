import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-signup-information',
  imports: [MatIcon],
  templateUrl: './signup-information.component.html',
  styleUrl: './signup-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupInformationComponent {
  trialFeatures = signal([
    'Full access to premium features',
    'Up to 1.000 thousand users withtou additional cost',
    'Customer support through email and chat',
    "No compromise - Stop using if you didn't like it",
  ]);
}
