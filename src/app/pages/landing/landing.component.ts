import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { DashboardPreviewComponent } from './dashboard-preview/dashboard-preview.component';
import { GamificationSectionComponent } from './gamification-section/gamification-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { PricingSectionComponent } from './pricing-section/pricing-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { CtaSectionComponent } from './cta-section/cta-section.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports: [
    MatToolbarModule,
    HeroSectionComponent,
    FeaturesSectionComponent,
    DashboardPreviewComponent,
    GamificationSectionComponent,
    TestimonialsSectionComponent,
    PricingSectionComponent,
    CtaSectionComponent,
    FooterSectionComponent,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition('void => *', [
        animate('0.6s ease-out')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ opacity: 0, transform: 'translateX(-50px)' })),
      transition('void => *', [
        animate('0.5s 0.2s ease-out')
      ])
    ])
  ]
})
export class LandingComponent implements OnInit, AfterViewInit {
  isHeaderVisible = false;

  constructor() { }

  ngOnInit(): void {
    // Initialize any required data here
  }

  ngAfterViewInit(): void {
    // Adding a small delay for the header animation
    setTimeout(() => {
      this.isHeaderVisible = true;
    }, 100);
  }

  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
