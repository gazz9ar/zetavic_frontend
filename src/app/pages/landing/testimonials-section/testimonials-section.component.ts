
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class TestimonialsSectionComponent {
  testimonials = [
    {
      quote: "Since implementing this system, we've reduced our breakfast food waste by 23% while improving guest satisfaction scores.",
      author: "Sarah Johnson",
      position: "Operations Manager, Grand Hotel"
    },
    {
      quote: "The staff engagement has noticeably improved thanks to the gamification features. Our team actually enjoys tracking breakfast attendance now!",
      author: "Michael Rodriguez",
      position: "F&B Director, Seaside Resort"
    },
    {
      quote: "The analytics have given us insights we never had before. We've optimized staffing during peak hours and improved our service flow.",
      author: "Emily Chen",
      position: "General Manager, Boutique Inn"
    }
  ];

  currentTestimonialIndex = 0;

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  previousTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
}