import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PopupComponent } from "../../../share/components/popup/popup.component";
import { PopupService } from '../../../core/services/popup.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PopupComponent],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit{
  viewOtpForm = false;
  minutes = 0;
  secondes = 60;
  timer:any;
  viewDecompte = false;
  validForm = false;
  viewBtnCreateUser = true
  texte=""; typeP="";
  loading: boolean = false;

  // nameCtrl!:FormControl;
  phoneCtrl!:FormControl;
  mailCtrl!:FormControl;
  nomStructureCtrl!:FormControl;
  codeStructureCtrl!:FormControl;
  numCarteProCtrl!:FormControl;
  passwordCtrl!:FormControl;
  passwordConfirmCtrl!:FormControl;
  otpCtrl!:FormControl;
  userForm!:FormGroup;

  constructor(
    private router:Router,
    private form:FormBuilder,
    private authService:AuthService,
    private popupService : PopupService
  ){}
  ngOnInit(): void {
    this.initCtrls();
    this.initForm();
    this.otpCtrl = this.form.control("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  }
  private initCtrls(){
    // this.nameCtrl = this.form.control("Nom", Validators.required);
    this.phoneCtrl = this.form.control("+237", Validators.required);
    this.mailCtrl = this.form.control("", Validators.required);
    this.nomStructureCtrl = this.form.control("", Validators.required);
    this.codeStructureCtrl = this.form.control("", Validators.required);
    this.numCarteProCtrl = this.form.control("", Validators.required);
    this.passwordCtrl = this.form.control("", Validators.minLength(8));
    this.passwordConfirmCtrl = this.form.control("", Validators.minLength(8));
  }

  private initForm(){
    this.userForm = this.form.group({
      // name: this.nameCtrl,
      phone:this.phoneCtrl,
      email:this.mailCtrl,
      nomStructure:this.nomStructureCtrl,
      codeStructure:this.codeStructureCtrl,
      // numCartePro:this.numCarteProCtrl,
      password:this.passwordCtrl
    })
  }
  controlForm(){
    const checkbox = document.getElementById('confirm') as HTMLInputElement;
    // console.log(this.passwordCtrl.value.length, checkbox?.checked, this.passwordCtrl.value, this.passwordConfirmCtrl.value);
    
    if(checkbox?.checked && this.passwordCtrl.value == this.passwordConfirmCtrl.value && this.passwordCtrl.value.length >=8 && this.phoneCtrl.value!="" && this.mailCtrl.value !="" && this.codeStructureCtrl.value !="" && this.nomStructureCtrl.value!=""){
      this.validForm = true
    }
  }
  createUser(){
    this.controlForm()
    if(this.userForm.valid && this.validForm){
      this.viewBtnCreateUser = false;
      this.loading = true;
      console.log(this.userForm.value);
      this.authService.signUp(this.userForm.value).pipe(
        catchError((error:any)=>{
          this.loading = false;
          this.texte = "Echec de l'inscription une erreur interne est survenue"; this.typeP ="error";
          this.popupService.showPopup(this.texte, this.typeP)
          this.viewBtnCreateUser = true;
          return throwError(() => error)
        })
      )
      .subscribe((res:any)=>{
        if(res.message){
          this.loading = false;
          this.texte = "Compte ouvert avec success"; this.typeP ="success";
          this.popupService.showPopup(this.texte, this.typeP);
          this.viewBtnCreateUser = true;
          this.goToOptForm()
        }}
      );
    }
    else{
      this.loading = false
      this.texte = "Informations incorrectes ou champs manquants"; this.typeP ="warning";
      this.popupService.showPopup(this.texte, this.typeP);
    }
  }
  verifyOtp(){ 
    if(this.mailCtrl.value !="" && this.otpCtrl.value !=""){
      this.loading = true;
      this.authService.verifyOtp(this.otpCtrl.value, this.mailCtrl.value).pipe(
        catchError((error:any)=>{
          this.loading = false;
          this.texte = "OTP invalide"; this.typeP ="error";
          this.popupService.showPopup(this.texte, this.typeP);
          return throwError(()=>error)
        })
      )
      .subscribe((res)=>{    
        if(res.message){
          this.loading = false;
          this.texte = "OTP vérifié"; this.typeP ="success";
          this.popupService.showPopup(this.texte, this.typeP);
          this.authService.login(this.mailCtrl.value, this.passwordCtrl.value).subscribe()
          setTimeout(() => {
            this.goToGestion()
          }, 5000);
        }
      })
    }else{
      this.texte = "Champs incorrectes ou manquants"; this.typeP ="warning";
      this.popupService.showPopup(this.texte, this.typeP);
    }
  }
  goToConnexion(){
    this.router.navigateByUrl("/")
  }
  goToGestion(){
    this.router.navigateByUrl("/gestion")
  }
  goToOptForm(){
    if(this.viewOtpForm == false){
      this.viewOtpForm = true;
    }
    else{
      this.viewOtpForm = false;
    }
  }
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
