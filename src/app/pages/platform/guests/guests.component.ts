import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guests',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsComponent {

}
