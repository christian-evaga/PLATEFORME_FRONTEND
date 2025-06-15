import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{
  view = false;
  user: any;
  constructor(
    public userService: UserService,
    public authService : AuthService
  ){}
  ngOnInit(): void {
    this.user = this.userService.currentUser;   
  }
  accordeon(){
    let adminLink = document.getElementById("admin");
    let sousOptionCont = document.getElementById("sousOption");
    let fleche = document.getElementById("fleche");
    if(!this.view){
      adminLink?.classList.add("active");
      sousOptionCont?.classList.add("view");
      fleche?.classList.add("rotate");
      this.view = true;
    }else{
      adminLink?.classList.add("active");
      sousOptionCont?.classList.remove("view");
      fleche?.classList.remove("rotate");
      this.view = false;
    }
  }
  setActive(){
    let adminLink = document.getElementById("admin");
    let sousOptionCont = document.getElementById("sousOption");
    adminLink?.classList.add("active");
    sousOptionCont?.classList.add("view");
  }
  closeOptionAdmin(){
    let sousOptionCont = document.getElementById("sousOption");
    let fleche = document.getElementById("fleche");
    fleche?.classList.remove("rotate");
    sousOptionCont?.classList.remove("view");
    this.view = false;
  }
}
