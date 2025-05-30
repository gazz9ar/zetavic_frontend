import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, signal } from '@angular/core';
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
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {

  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
