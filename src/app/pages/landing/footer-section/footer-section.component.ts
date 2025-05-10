import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.scss']
})
export class FooterSectionComponent {
  currentYear = new Date().getFullYear();

  links = {
    company: [
      { name: 'About Us', url: '/about' },
      { name: 'Contact', url: '/contact' },
      { name: 'Careers', url: '/careers' },
      { name: 'Blog', url: '/blog' }
    ],
    legal: [
      { name: 'Terms of Service', url: '/terms' },
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Cookie Policy', url: '/cookies' }
    ],
    product: [
      { name: 'Features', url: '/features' },
      { name: 'Pricing', url: '/pricing' },
      { name: 'Roadmap', url: '/roadmap' },
      { name: 'Support', url: '/support' }
    ]
  };
}
