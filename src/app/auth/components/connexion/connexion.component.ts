import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PopupComponent } from "../../../share/components/popup/popup.component";
import { catchError, throwError } from 'rxjs';
import { PopupService } from '../../../core/services/popup.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PopupComponent],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit{
  texte!:string; typeP="";
  isVerificateur: boolean = false;
  loading: boolean = false;
  constructor(
    private router: Router,
    private form : FormBuilder,
    private authService : AuthService,
    private popupservice : PopupService
  ){}
  mailCtrl!: FormControl;
  passwordCtrl!:FormControl;
  verificateurCtrl!:FormControl;
  loginForm!:FormGroup;

  ngOnInit(): void {
    this.initCtrl();
    this.initForm();
  }

  private initCtrl(){
    this.mailCtrl = this.form.control("");
    this.passwordCtrl = this.form.control("");
    this.verificateurCtrl = this.form.control("");
  }
  private initForm(){
    this.loginForm = this.form.group({
      email : [this.mailCtrl, Validators.required],
      password : [this.passwordCtrl, Validators.required],
    })
  }
  formValid(){
    let valid = false;
    if(this.mailCtrl.value !="" && this.passwordCtrl.value !=""){
      valid = true
      return valid;
    }else{return valid;} 
  }

  loginVerificateur(){
    console.log(this.verificateurCtrl.value);
    if(this.verificateurCtrl.value.toLowerCase() == this.authService.codeVerificateur.toLowerCase()){
      if(this.formValid()){  
        this.authService.loginVerificateur(this.loginForm.value.email.value, this.loginForm.value.password.value).pipe(
          catchError((error : any)=>{
            this.loading = false;
            console.log(error);
            this.texte ="Vérificateur non autorisé connexion refusée!";this.typeP="error";
            this.popupservice.showPopup(this.texte, this.typeP);
            return throwError(() => error)
          })
        )
        .subscribe((res)=>{
          if(res.verificateurId){
            this.loading = false;
            this.texte ="Vérificateur reconnu connexion autorisée!";this.typeP="success";
            this.popupservice.showPopup(this.texte, this.typeP);
            // this.goToGestion();
          }})
      }else{
        this.texte ="Informations manquantes ou incorrectes!";this.typeP="warning";
        this.popupservice.showPopup(this.texte, this.typeP);
      }
    }
    else{
      this.loading = false;
      this.texte ="Code de vérificateur incorrect!";this.typeP="error";
      this.popupservice.showPopup(this.texte, this.typeP);
    }
  }
  loginUser(){
    if(this.formValid()){  
        this.authService.login(this.loginForm.value.email.value, this.loginForm.value.password.value).pipe(
          catchError((error : any)=>{
            this.loading = false;
            console.log(error);
            this.texte ="utilisateur non autorisé connexion refusée!";this.typeP="error";
            this.popupservice.showPopup(this.texte, this.typeP);
            return throwError(() => error)
          })
        )
        .subscribe((res)=>{
          if(res.userId){
            this.loading = false;
            this.texte ="utilisateur reconnu connexion autorisée!";this.typeP="success";
            this.popupservice.showPopup(this.texte, this.typeP);
            // this.goToGestion();
          }})
      }else{
        this.loading = false;
        this.texte ="Informations manquantes ou incorrectes!";this.typeP="warning";
        this.popupservice.showPopup(this.texte, this.typeP);
      }
  }
  login(){
    this.loading = true;
    if(this.isVerificateur){
      this.loginVerificateur()
    }else{
      this.loginUser();
    }
  }
  typeLogin(val: boolean){
    this.isVerificateur = val;
  }
  goToInscription(){
    this.router.navigateByUrl("/inscription")
  }
  goToGestion(){
    this.router.navigateByUrl("/gestion")
  }
}