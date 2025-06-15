import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { VerificateurService } from './core/services/verificateur.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontendPublic';
  constructor(
    private authservice : AuthService,
    private userService : UserService,
    private verificateurService : VerificateurService,
    private router : Router
  ){}
  ngOnInit(): void {
    this.authservice.autoConnect();
    this.getCurrentUser();
    // this.authservice.logout();
  }
  getCurrentUser(){
    if(this.authservice.userId){
      console.log(this.authservice.userId, this.authservice.typeUser);
      
      if(this.authservice.typeUser == "exportateur"){
        this.userService.getUserById(this.authservice.userId).subscribe((res)=>{
          this.userService.currentUser = res;
          console.log(this.userService.currentUser);
          if(res.role == 'admin'){this.router.navigateByUrl("/gestion/admin")}
          else if(res.role == 'system'){this.router.navigateByUrl("/verificateur/home-si")}
          else{this.router.navigateByUrl("/gestion")}
        })
        this.userService.user$.subscribe(data =>this.userService.currentUser = data);
      }else{
        this.verificateurService.getVerificateurById(this.authservice.userId).subscribe((res)=>{
          this.userService.currentUser = res;
          console.log(this.userService.currentUser);
          this.router.navigateByUrl("/verificateur")
        })
        this.userService.user$.subscribe(data =>this.userService.currentUser = data);
      }
    }else{
      this.authservice.logout();
    }
  }
}
