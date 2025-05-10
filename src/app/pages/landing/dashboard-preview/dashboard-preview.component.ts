import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-preview',
  templateUrl: './dashboard-preview.component.html',
  imports: [MatIconModule],
  styleUrls: ['./dashboard-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInFromRight', [
      state('void', style({ opacity: 0, transform: 'translateX(50px)' })),
      transition('void => *', [
        animate('0.7s ease-out')
      ])
    ])
  ]
})
export class DashboardPreviewComponent {
  dashboardFeatures = [
    'Occupancy vs. breakfast attendance tracking',
    'Peak time analysis by hour',
    'Resource optimization metrics',
    'Staff performance indicators',
    'Next-day forecasting',
    'Food cost analytics'
  ];
}