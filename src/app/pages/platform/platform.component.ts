import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-platform',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformComponent {

}
