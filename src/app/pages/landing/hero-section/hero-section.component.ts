import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(40px)' })),
      transition('void => *', [
        animate('0.8s 0.3s ease-out')
      ])
    ]),
    trigger('staggeredFadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate('0.5s {{delay}}s ease-out')
      ], { params: { delay: 0 } })
    ])
  ]
})
export class HeroSectionComponent {
  tagline = 'Simplify Breakfast Management for Your Hotel';
  description = 'Streamline guest tracking, reduce waste, and enhance the breakfast experience with our intuitive platform designed specifically for hospitality professionals.';
}
