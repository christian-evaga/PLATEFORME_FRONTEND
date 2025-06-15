import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit{
  phoneCtrl!:FormControl;
  mailCtrl!:FormControl;
  passwordCtrl!:FormControl;
  passwordConfirmCtrl!:FormControl;
  userForm!:FormGroup;
  nomStructureCtrl!: FormControl;
  codeStructureCtrl!: FormControl;
  view = false;

  constructor(
    private userService : UserService,
    private form : FormBuilder,
    private router : Router
  ){}
  ngOnInit(): void {
    console.log(this.userService.currentUser);
    this.initCtrls();
    this.initForm();
  }
  private initCtrls(){
    this.phoneCtrl = this.form.control(this.userService.currentUser.phone, Validators.required);
    this.mailCtrl = this.form.control(this.userService.currentUser.email, Validators.required);
    this.nomStructureCtrl = this.form.control(this.userService.currentUser.nomStructure, Validators.required);
    this.codeStructureCtrl = this.form.control(this.userService.currentUser.codeStructure, Validators.required);
    this.passwordCtrl = this.form.control("", Validators.minLength(8));
    this.passwordConfirmCtrl = this.form.control("", Validators.minLength(8));
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
  update(){
    if(this.passwordCtrl.value !="" && this.passwordConfirmCtrl.value !="" && this.mailCtrl.value !="" && this.phoneCtrl.value !="" && this.passwordConfirmCtrl.value == this.passwordCtrl.value){
      console.log(this.userForm.value);
    }
  }
  back(){
    this.router.navigateByUrl("gestion")
  }
  supprimer(){}
  viewMenu(){
    if(!this.view){this.view = true}
    else{this.view = false}
  }
  annuler(){
    this.view = false;
  }
}
