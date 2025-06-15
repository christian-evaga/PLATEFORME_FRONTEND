import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { SideBarComponent } from '../core/components/side-bar/side-bar.component';
import { AuthService } from '../core/services/auth.service';
import { BordereauxService } from '../core/services/bordereaux.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/user.service';
import { VerificateurService } from '../core/services/verificateur.service';
import { GestionService } from './services/gestion.service';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, CommonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss'
})
export class GestionComponent implements OnInit{
  constructor(private authservice : AuthService,
              private bordereauService :BordereauxService,
              private userService : UserService,
              private verificateurService : VerificateurService,
              public gestionService : GestionService,
    ){}

  ngOnInit(): void {
    console.log(this.authservice.token, this.authservice.userId);   
    this.bordereauService.getAllBordereauxOfUser();
    this.userService.getAllUsers();
    this.verificateurService.getAllVerificateurs();
  }
}
