import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { GestionService } from '../../../../services/gestion.service';
import { UserService } from '../../../../../core/services/user.service';
import { VerificateurService } from '../../../../../core/services/verificateur.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { PopupComponent } from "../../../../../share/components/popup/popup.component";
import { PopupService } from '../../../../../core/services/popup.service';
import { LoadingComponent } from "../../../../../share/components/loading/loading.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, PopupComponent, LoadingComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  constructor(
    private router : Router,
    private gestionService : GestionService,
    private userService : UserService,
    private verificateurService:VerificateurService,
    private authservice : AuthService,
    private popupService : PopupService
  ){
  }

  view = false;
  currentRow!:any;
  texte="";
  typeP="warning";
  typeUser = "exportateurs";
  Users!: any[];
  Verificateurs!: any[];
  currentUsers!: any[];
  cols!:any[];
  colsUser = [
    {field: 'nomStructure', header: 'Nom structure' },
    {field:'codeStructure', header:'Code structure'},
    {field:'phone', header:'Téléphone'},
    {field:"email", header:'Email'}
  ];
  colsVerificateur = [
    {field: 'name', header: 'Nom' },
    {field:'service', header:'Service'},
    {field:'phone', header:'Téléphone'},
    {field:"email", header:'Email'}
  ]
  loading: boolean = false;

  ngOnInit(): void {
    this.currentUsers = this.userService.users;
    this.cols = this.colsUser;
    this.loading = true;
    this.userService.users$.subscribe(data => {
      this.loading = false;
      this.currentUsers = data
    })
    this.initObservables();
  }
  initObservables(){
    this.userService.users$.subscribe(data =>{
      this.Users = data
    });
    this.verificateurService.verificateurs$.subscribe(data =>{
      this.Verificateurs = data
    });
  }
  goToAdmin(){this.router.navigateByUrl("gestion/admin")}
  switchUser(userType:string){
    this.typeUser = userType;
    this.gestionService.currentUserType =userType;
    if(userType == "exportateurs"){
      this.cols = this.colsUser;
      this.currentUsers = this.Users;
    }else{
      this.cols =this.colsVerificateur;
      this.currentUsers = this.Verificateurs
    }
  }
  clear(table: Table){
    table.clear()
  }
  filter(dt:Table, event:any){
    dt.filterGlobal(event.target.value, 'contains')
  }
  createUser(){
    this.gestionService.currentUserType = this.typeUser;
    this.gestionService.currentUserCreated = undefined;
   this.router.navigateByUrl("gestion/admin/create-user");
  }
  modifyUser(user:any){
    this.gestionService.currentUserType = this.typeUser;
    this.gestionService.currentUserCreated = user;
    this.router.navigateByUrl("gestion/admin/create-user");
  }
  supprimer(){
    console.log(this.currentRow);
    this.view = false;
    if(this.typeUser == "exportateurs"){this.userService.deleteUser(this.currentRow._id).pipe(
      catchError((error:any)=>{
        this.texte = "Utilisateur non trouvé"; this.typeP ="error";
        this.popupService.showPopup(this.texte, this.typeP)
        return throwError(() => error)
      })
    )
    .subscribe((res:any)=>{
      if(res.message){
        this.texte = "Utilisateur supprimé avec success"; this.typeP ="success";
        this.popupService.showPopup(this.texte, this.typeP);
      }}
    );
    }
    else{this.verificateurService.deleteVerificateur(this.currentRow._id).pipe(
      catchError((error:any)=>{
        this.texte = "Vérificateur non trouvé"; this.typeP ="error";
        this.popupService.showPopup(this.texte, this.typeP)
        return throwError(() => error)
      })
    )
    .subscribe((res:any)=>{
      if(res.message){
        this.texte = "Vérificateur supprimé avec succès"; this.typeP ="success";
        this.popupService.showPopup(this.texte, this.typeP);
      }}
    );}
  }

  viewMenu(user:any){
    this.currentRow = user
    if(!this.view){this.view = true}
    else{this.view = false}
  }
  annuler(){
    this.view = false;
  }
}