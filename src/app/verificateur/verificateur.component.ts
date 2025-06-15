import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { SideBarComponent } from '../core/components/side-bar/side-bar.component';

@Component({
  selector: 'app-verificateur',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, SideBarComponent],
  templateUrl: './verificateur.component.html',
  styleUrl: './verificateur.component.scss'
})
export class VerificateurComponent {

}
