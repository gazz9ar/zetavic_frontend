import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gamification-section',
  templateUrl: './gamification-section.component.html',
  styleUrls: ['./gamification-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  animations: [
    trigger('pulseAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('void => *', [
        animate('0.6s ease-out')
      ])
    ])
  ]
})
export class GamificationSectionComponent {
  gamificationFeatures = [
    {
      title: 'Achievement Badges',
      description: 'Earn recognition for operational excellence and guest satisfaction.',
      icon: 'emoji_events'
    },
    {
      title: 'Experience Levels',
      description: 'Progress from Novice to Hospitality Master as you perfect your service.',
      icon: 'trending_up'
    },
    {
      title: 'Team Challenges',
      description: 'Compete with other shifts or hotels to improve performance metrics.',
      icon: 'groups'
    },
    {
      title: 'Unlockable Features',
      description: 'Gain access to premium tools and customizations through consistent performance.',
      icon: 'lock_open'
    }
  ];
}