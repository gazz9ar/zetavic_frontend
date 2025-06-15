import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';


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
    MatButtonModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  document = inject(DOCUMENT);

  scrollToSection(section: string): void {
    const element = this.document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
