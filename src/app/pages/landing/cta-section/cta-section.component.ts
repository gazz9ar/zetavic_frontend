import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'app-cta-section',
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.scss'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('bounce', [
      state('void', style({ transform: 'translateY(20px)' })),
      transition('void => *', [
        animate('0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ])
    ])
  ]
})
export class CtaSectionComponent {
  ctaTitle = 'Ready to Optimize Your Hotel Breakfast Service?';
  ctaText = 'Start your 14-day free trial today. No credit card required.';
}
