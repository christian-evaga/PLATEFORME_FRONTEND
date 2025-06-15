import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  view = false;
  constructor(public authService : AuthService,
              public userService : UserService,
              private router : Router
    ){}
  ngOnInit(): void {
    console.log(this.userService.currentUser);
  }
  viewMenu(){
    if(!this.view){this.view = true}
    else{this.view = false}
  }
  deconnexion(){
    this.authService.logout();
    this.view = false;
  }
  goToProfil(){
    this.router.navigateByUrl("gestion/profil");
    this.view = false;
  }
}
