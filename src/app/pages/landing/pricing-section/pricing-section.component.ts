
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  styleUrls: ['./pricing-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDividerModule, MatCardModule, MatIconModule, MatButtonModule],
  animations: [
    trigger('elevateOnHover', [
      state('default', style({ transform: 'translateY(0)' })),
      state('hovered', style({ transform: 'translateY(-10px) scale(1.01)' })),
      transition('default <=> hovered', [
        animate('0.3s')
      ])
    ])
  ]
})
export class PricingSectionComponent {
  pricingPlans = [
    {
      name: 'Basic',
      price: 29,
      period: 'per month',
      features: [
        'Up to 50 guest tracking',
        'CSV import/export',
        'Basic reporting',
        'Email support',
        '1 user account'
      ],
      highlighted: false,
      state: 'default'
    },
    {
      name: 'Professional',
      price: 79,
      period: 'per month',
      features: [
        'Up to 200 guest tracking',
        'Advanced analytics',
        'Staff performance metrics',
        'Gamification features',
        'Up to 5 user accounts',
        'Priority support'
      ],
      highlighted: true,
      state: 'default'
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'per month',
      features: [
        'Unlimited guest tracking',
        'Custom reports & API access',
        'Multi-property management',
        'Full gamification suite',
        'Unlimited user accounts',
        'Dedicated account manager'
      ],
      highlighted: false,
      state: 'default'
    }
  ];

  toggleCardState(card: any): void {
    card.state = card.state === 'default' ? 'hovered' : 'default';
  }
}