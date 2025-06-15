import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GestionService } from '../../services/gestion.service';
import { CommonModule } from '@angular/common';
import { Producteur } from '../../../core/models/bordereau.schema';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.scss'
})
export class ProduitComponent implements OnInit{
  @Input() index!:number;
  @Input() producteur!:Producteur;
  view = true;
    nomCtrl!: FormControl;
    phoneCtrl!:FormControl
    regionCtrl!: FormControl;
    departementCtrl!:FormControl;
    arrondissementCtrl!:FormControl;
    lieuDitCtrl!:FormControl;
    quantiteCtrl!: FormControl
    produitForm!: FormGroup
  constructor(
    private form : FormBuilder,
    private gestionService : GestionService,
  ){}
  ngOnInit(): void {
    this.initCtrls();
    this.initForm();
  }
  private initCtrls(){
    this.nomCtrl = this.form.control(this.producteur.nom, Validators.required);
    this.phoneCtrl = this.form.control(this.producteur.phone, Validators.required);
    this.regionCtrl = this.form.control(this.producteur.region, Validators.required);
    this.departementCtrl = this.form.control(this.producteur.departement, Validators.required);
    this.arrondissementCtrl = this.form.control(this.producteur.arrondissement, Validators.required);
    this.lieuDitCtrl = this.form.control(this.producteur.lieuDit, Validators.required);
    this.quantiteCtrl = this.form.control(this.producteur.quantite, Validators.required);
  }
  private initForm(){
    this.produitForm = this.form.group({
      nom : this.nomCtrl,
      phone : this.phoneCtrl,
      region : this.regionCtrl,
      departement : this.departementCtrl,
      arrondissement : this.arrondissementCtrl,
      lieuDit : this.lieuDitCtrl,
      quantite : this.quantiteCtrl,
      geometrie : "",
      dateDeNaissance : new Date()
    })
  }
  show(){
    if(this.view){this.view = false}
    else{this.view = true}
  }
  enregistrerProduit(event : MouseEvent){
    event.preventDefault();
    this.gestionService.producteurs[this.index] = this.produitForm.value;
    this.view=false;
    // console.log(this.gestionService.producteurs);
  }
  supprimerProduit(event : MouseEvent){
    event.preventDefault();
    this.gestionService.producteurs.splice(this.index,1);
    // console.log(this.gestionService.producteurs);
  }
}
