import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../../../services/gestion.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { PopupService } from '../../../../../core/services/popup.service';
import { PopupComponent } from "../../../../../share/components/popup/popup.component";
import { catchError, throwError } from 'rxjs';
import { VerificateurService } from '../../../../../core/services/verificateur.service';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, PopupComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit{
  constructor(
    public gestionService : GestionService,
    private router:Router,
    private form:FormBuilder,
    private authService:AuthService,
    private verificateurService : VerificateurService,
    private userService : UserService,
    private popupService : PopupService
  ){}

  viewOtpForm = false;
  minutes = 0;
  secondes = 60;
  timer:any;
  viewDecompte = false;
  validForm = false;
  texte=""; typeP="";
  currentUser!:any;

// variables formulaire responsable
  phoneCtrl!:FormControl;
  mailCtrl!:FormControl;
  nomStructureCtrl!:FormControl;
  codeStructureCtrl!:FormControl;
  // numCarteProCtrl!:FormControl;
  passwordCtrl!:FormControl;
  passwordConfirmCtrl!:FormControl;
  otpCtrl!:FormControl;
  userForm!:FormGroup;

//variables formulaire vérificateur
  phoneVCtrl!:FormControl;
  mailVCtrl!:FormControl;
  nameCtrl!:FormControl;
  serviceCtrl!:FormControl;
  passwordVCtrl!:FormControl;
  passwordConfirmVCtrl!:FormControl;
  verificateurForm!:FormGroup;

  ngOnInit(): void {
    console.log(this.gestionService.currentUserType);
    console.log(this.gestionService.currentUserCreated);
    // this.initCtrls([]);
    this.initCtrlUser();
    this.initForm();
    // this.initVerificateurCtrls();
    this.initCtrlVerificateur();
    this.initVerificateurForm();
    this.otpCtrl = this.form.control("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  }

  private initCtrlUser(){
    if(this.gestionService.currentUserCreated!=undefined){
      this.initCtrls([this.gestionService.currentUserCreated.phone, this.gestionService.currentUserCreated.email, this.gestionService.currentUserCreated.nomStructure, this.gestionService.currentUserCreated.codeStructure, this.gestionService.currentUserCreated.password, this.gestionService.currentUserCreated.password])
    }else{
      this.initCtrls([]);
    }
  }
  private initCtrlVerificateur(){
    if(this.gestionService.currentUserCreated!=undefined){
      this.initVerificateurCtrls([this.gestionService.currentUserCreated.phone, this.gestionService.currentUserCreated.email, this.gestionService.currentUserCreated.name, this.gestionService.currentUserCreated.service, this.gestionService.currentUserCreated.password, this.gestionService.currentUserCreated.password])
    }else{
      this.initVerificateurCtrls([]);
    }
  }
  private initCtrls(params : any){
    this.phoneCtrl = this.form.control(params[0], Validators.required);
    this.mailCtrl = this.form.control(params[1], Validators.required);
    this.nomStructureCtrl = this.form.control(params[2], Validators.required);
    this.codeStructureCtrl = this.form.control(params[3], Validators.required);
    // this.numCarteProCtrl = this.form.control(params[4], Validators.required);
    this.passwordCtrl = this.form.control(params[4], Validators.minLength(8));
    this.passwordConfirmCtrl = this.form.control(params[5], Validators.minLength(8));
  }

  private initVerificateurCtrls(params :any){
    this.phoneVCtrl = this.form.control(params[0], Validators.required);
    this.mailVCtrl = this.form.control(params[1], Validators.required);
    this.nameCtrl = this.form.control(params[2], Validators.required);
    this.serviceCtrl = this.form.control(params[3], Validators.required);
    this.passwordVCtrl = this.form.control(params[4], Validators.minLength(8));
    this.passwordConfirmVCtrl = this.form.control(params[5], Validators.minLength(8));
  }

  private initForm(){
    this.userForm = this.form.group({
      phone:this.phoneCtrl,
      email:this.mailCtrl,
      nomStructure:this.nomStructureCtrl,
      codeStructure:this.codeStructureCtrl,
      password:this.passwordCtrl
    })
  }

  private initVerificateurForm(){
    this.verificateurForm = this.form.group({
      name:this.nameCtrl,
      phone:this.phoneVCtrl,
      email:this.mailVCtrl,
      service : this.serviceCtrl,
      password:this.passwordVCtrl
    })
  }
  controlForm(){
    const checkbox = document.getElementById('confirm') as HTMLInputElement;
    // console.log(this.passwordCtrl.value.length, checkbox?.checked, this.passwordCtrl.value, this.passwordConfirmCtrl.value);
    
    if(checkbox?.checked && this.passwordCtrl.value == this.passwordConfirmCtrl.value && this.passwordCtrl.value.length >=8 && this.phoneCtrl.value!="" && this.mailCtrl.value !="" && this.codeStructureCtrl.value !="" && this.nomStructureCtrl.value!=""){
      this.validForm = true
    }
  }
  controlVerificateurForm(){
    let verify = false;
    const checkbox = document.getElementById('confirmVerificateur') as HTMLInputElement;
    // console.log(this.passwordCtrl.value.length, checkbox?.checked, this.passwordCtrl.value, this.passwordConfirmCtrl.value);
    
    if(checkbox?.checked && this.passwordVCtrl.value == this.passwordConfirmVCtrl.value && this.passwordVCtrl.value.length >=8 && this.phoneVCtrl.value!="" && this.mailVCtrl.value !="" && this.nameCtrl.value !=""){
      verify= true
    }
    return verify
  }

  createUser(){
    this.controlForm()
    if(this.userForm.valid && this.validForm){
      console.log(this.userForm.value);
      this.authService.signUp(this.userForm.value).pipe(
        catchError((error:any)=>{
          this.texte = "Echec de l'inscription une erreur interne est survenue"; this.typeP ="error";
          this.popupService.showPopup(this.texte, this.typeP)
          return throwError(() => error)
        })
      )
      .subscribe((res:any)=>{
        if(res.message){
          this.texte = "Compte ouvert avec success"; this.typeP ="success";
          this.popupService.showPopup(this.texte, this.typeP);
          this.goToOptForm()
        }}
      );
    }
    else{
      this.texte = "Informations incorrectes ou champs manquants"; this.typeP ="warning";
      this.popupService.showPopup(this.texte, this.typeP);
    }
  }
  modifyUser(){
    this.controlForm()
    if(this.userForm.valid && this.validForm){
      console.log(this.userForm.value);
      this.userService.updateUser(this.gestionService.currentUserCreated._id, this.userForm.value).pipe(
        catchError((error:any)=>{
          this.texte = "Requête invalide ou utilisateur non trouvé"; this.typeP ="error";
          this.popupService.showPopup(this.texte, this.typeP)
          return throwError(() => error)
        })
      )
      .subscribe((res:any)=>{
        if(res.message){
          this.texte = "Utilisateur modifié avec succès"; this.typeP ="success";
          this.popupService.showPopup(this.texte, this.typeP);
        }}
      );
    }
    else{
      this.texte = "Informations incorrectes ou champs manquants"; this.typeP ="warning";
      this.popupService.showPopup(this.texte, this.typeP);
    }
  }

  createVerificateur(){
    if(this.controlVerificateurForm() && this.verificateurForm.valid){
      console.log(this.verificateurForm.value);
      this.verificateurService.createVerificateur(this.verificateurForm.value).pipe(
        catchError((error:any)=>{
          this.texte = "Echec de la création, une erreur interne est survenue"; this.typeP ="error";
          this.popupService.showPopup(this.texte, this.typeP)
          return throwError(() => error)
        })
      )
      .subscribe((res:any)=>{
        if(res.message){
          this.texte = "Verificateur crée avec success"; this.typeP ="success";
          this.popupService.showPopup(this.texte, this.typeP);
          this.goToOptForm()
        }}
      );
    }
    else{
      this.texte = "Informations incorrectes ou champs manquants"; this.typeP ="warning";
      this.popupService.showPopup(this.texte, this.typeP);
    }
  }
  modifyVerificateur(){
    if(this.controlVerificateurForm() && this.verificateurForm.valid){
      console.log(this.verificateurForm.value);
      this.verificateurService.updateInfoVerificateur(this.gestionService.currentUserCreated._id, this.verificateurForm.value).pipe(
        catchError((error:any)=>{
          this.texte = "Requête invalide ou verificateur non trouvé"; this.typeP ="error";
          this.popupService.showPopup(this.texte, this.typeP)
          return throwError(() => error)
        })
      )
      .subscribe((res:any)=>{
        if(res.message){
          this.texte = "Vérificateur modifié avec succès"; this.typeP ="success";
          this.popupService.showPopup(this.texte, this.typeP);
        }}
      );
    }
    else{
      this.texte = "Informations incorrectes ou champs manquants"; this.typeP ="warning";
      this.popupService.showPopup(this.texte, this.typeP);
    }
  }

  verifyOtp(){ 
    if(this.mailCtrl.value !="" && this.otpCtrl.value !=""){
      this.authService.verifyOtp(this.otpCtrl.value, this.mailCtrl.value).pipe(
        catchError((error:any)=>{
          this.texte = "OTP invalide"; this.typeP ="error";
          this.popupService.showPopup(this.texte, this.typeP);
          return throwError(()=>error)
        })
      )
      .subscribe((res)=>{    
        if(res.message){
          this.texte = "OTP vérifié"; this.typeP ="success";
          this.popupService.showPopup(this.texte, this.typeP);
          this.router.navigateByUrl("/gestion/admin")
        }
      })
    }else{
      this.texte = "Champs incorrectes ou manquants"; this.typeP ="warning";
      this.popupService.showPopup(this.texte, this.typeP);
    }
  }

  goToOptForm(){
    if(this.viewOtpForm == false){
      this.viewOtpForm = true;
    }
    else{
      this.viewOtpForm = false;
    }
  }
  goToAdmin(){this.router.navigateByUrl("gestion/admin")}
  startTimer(){
    this.timer = setInterval(()=>{
      this.viewDecompte = true;
      if(this.minutes < 1 && this.secondes > 0){
        this.secondes--;
      }
      else if(this.minutes >= 1){
        this.minutes--;
        this.secondes = 60;
      }
      else{
        clearInterval(this.timer);
        this.viewDecompte = false;
      }
    }, 1000)
  }
}
