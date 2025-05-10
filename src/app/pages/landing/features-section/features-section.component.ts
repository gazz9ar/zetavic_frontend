
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss'],
  imports: [MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInFromBottom', [
      state('void', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition('void => *', [
        animate('0.5s {{delay}}s ease-out')
      ], { params: { delay: 0 } })
    ])
  ]
})
export class FeaturesSectionComponent {
  features = [
    {
      icon: 'speed',
      title: 'Real-time Tracking',
      description: 'Monitor breakfast attendance in real-time, with instant updates as guests check in.'
    },
    {
      icon: 'bar_chart',
      title: 'Smart Analytics',
      description: 'Gain insights into patterns and optimize resources with our powerful dashboard.'
    },
    {
      icon: 'file_upload',
      title: 'Easy CSV Import',
      description: 'Import guest lists effortlessly from your existing hotel management system.'
    },
    {
      icon: 'eco',
      title: 'Reduce Food Waste',
      description: 'Better predict demand and reduce unnecessary food preparation costs.'
    },
    {
      icon: 'people',
      title: 'Role-based Access',
      description: 'Customize access levels for different staff members, from receptionists to managers.'
    },
    {
      icon: 'notifications_active',
      title: 'Smart Notifications',
      description: 'Receive alerts on peak times, capacity thresholds, and important events.'
    }
  ];
}