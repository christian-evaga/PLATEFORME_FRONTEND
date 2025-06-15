import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitComponent } from '../produit/produit.component';
import { GestionService } from '../../services/gestion.service';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Bordereau } from '../../../core/models/bordereau.schema';
import { UserService } from '../../../core/services/user.service';
import { BordereauxService } from '../../../core/services/bordereaux.service';
import { PopupService } from '../../../core/services/popup.service';
import { PopupComponent } from "../../../share/components/popup/popup.component";
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {Regions} from '../../../../assets/datas/location'
import { LoadingComponent } from "../../../share/components/loading/loading.component";

@Component({
  selector: 'app-add-bordereau',
  standalone: true,
  imports: [ProduitComponent, CommonModule, FormsModule, ReactiveFormsModule, PopupComponent, LoadingComponent],
  templateUrl: './add-bordereau.component.html',
  styleUrl: './add-bordereau.component.scss'
})
export class AddBordereauComponent implements OnInit{
  constructor(
    private form : FormBuilder,
    public gestionService : GestionService,
    private authService : AuthService,
    private border : BordereauxService,
    private userService : UserService,
    private popupService : PopupService,
    private router : Router
  ){}
  numBordCtrl!:FormControl;
  nomExportateurCtrl!: FormControl;
  numCarteProExportateurCtrl!: FormControl;
  nomEntrepriseExportateurCtrl!: String;
  codeEntrepriseExportateurCtrl!: String;
  nomVendeurCtrl!:FormControl;
  numeroVendeurCtrl!:FormControl;
  emailVendeurCtrl!:FormControl;
  nomCooperativeCtrl!:FormControl;
  numeroCooperativeCtrl!:FormControl;
  emailCooperativeCtrl!:FormControl;
  regionVenteCtrl!:FormControl;
  departementVenteCtrl!:FormControl;
  arrondissementVenteCtrl!:FormControl;
  dateVenteCtrl!:FormControl;
  lieuVenteCtrl!:FormControl;
  volumeCacaoGrade1Ctrl!:FormControl;
  volumeCacaoGrade2Ctrl!:FormControl;
  volumeArabicaCtrl!: FormControl;
  volumeRobustaCtrl!:FormControl;
  volumeTotalCtrl!:FormControl;
  prixCacaoGrade1Ctrl!:FormControl;
  prixCacaoGrade2Ctrl!:FormControl;
  prixArabicaCtrl!: FormControl;
  prixRobustaCtrl!:FormControl;
  prixTotalCtrl!:FormControl;
  typeProduitCtrl!: FormControl;
  bordereauForm !:FormGroup;
  fileBordereauName!:string;
  fileProducteurName!:string;

  Bordereau = new Bordereau();

  date = new Date();
  currentCodeBordereau = "";
  texte = ""; typeP="";
  viewSubmit = true;
  Regions!:any;
  currentRegionIndex= 0;
  currentDepartementIndex= 0
  loading: boolean = false;

  ngOnInit(): void {
    this.texte = ""; this.typeP="";
    this.Regions = Regions;
    console.log(this.Regions);
    
    this.currentCodeBordereau = this.generateRandomCode();
    this.initCtrls();
    this.initForm();
    this.change();
    console.log(this.validerBordereau());
    console.log(this.gestionService.currentReponse);
  }
  private initCtrls(){
    if(this.gestionService.currentReponse!=undefined){
      this.typeProduitCtrl = this.form.control(this.gestionService.currentReponse.typeProduit, Validators.required);
      this.numBordCtrl = this.form.control(this.gestionService.currentReponse.numBordereau, Validators.required);
      this.nomExportateurCtrl = this.form.control(this.gestionService.currentReponse.nomExportateur, Validators.required)
      this.numCarteProExportateurCtrl = this.form.control( this.gestionService.currentReponse.numCarteProExportateur, Validators.required)
      this.nomEntrepriseExportateurCtrl = this.gestionService.currentReponse.nomEntrepriseExportateur
      this.codeEntrepriseExportateurCtrl = this.gestionService.currentReponse.codeEntrepriseExportateur
      this.nomVendeurCtrl = this.form.control(this.gestionService.currentReponse.nomVendeur, Validators.required);
      this.numeroVendeurCtrl = this.form.control(this.gestionService.currentReponse.numeroVendeur,Validators.required);
      this.emailVendeurCtrl = this.form.control(this.gestionService.currentReponse.emailVendeur);
      this.nomCooperativeCtrl = this.form.control(this.gestionService.currentReponse.nomCooperative,Validators.required);
      this.numeroCooperativeCtrl = this.form.control(this.gestionService.currentReponse.numeroCooperative);
      this.emailCooperativeCtrl = this.form.control(this.gestionService.currentReponse.emailCooperative);
      this.regionVenteCtrl = this.form.control(this.gestionService.currentReponse.regionVente,Validators.required);
      this.departementVenteCtrl = this.form.control(this.gestionService.currentReponse.departementVente,Validators.required);
      this.arrondissementVenteCtrl = this.form.control(this.gestionService.currentReponse.arrondissementVente,Validators.required);
      this.dateVenteCtrl = this.form.control(this.formatDate(this.gestionService.currentReponse.dateVente),Validators.required);
      this.lieuVenteCtrl = this.form.control(this.gestionService.currentReponse.lieuVente,Validators.required);
      this.volumeCacaoGrade1Ctrl = this.form.control(this.gestionService.currentReponse.volumeCacaoGrade1,Validators.required);
      this.volumeCacaoGrade2Ctrl = this.form.control(this.gestionService.currentReponse.volumeCacaoGrade2,Validators.required);
      this.volumeArabicaCtrl = this.form.control(this.gestionService.currentReponse.volumeArabica,Validators.required);
      this.volumeRobustaCtrl = this.form.control(this.gestionService.currentReponse.volumeRobusta,Validators.required);
      this.volumeTotalCtrl = this.form.control(this.gestionService.currentReponse.volumeTotal);
      this.prixCacaoGrade1Ctrl = this.form.control(this.gestionService.currentReponse.prixCacaoGrade1,Validators.required);
      this.prixCacaoGrade2Ctrl = this.form.control(this.gestionService.currentReponse.prixCacaoGrade2,Validators.required);
      this.prixArabicaCtrl = this.form.control(this.gestionService.currentReponse.prixArabica,Validators.required);
      this.prixRobustaCtrl = this.form.control(this.gestionService.currentReponse.prixRobusta,Validators.required);
      this.prixTotalCtrl = this.form.control(this.gestionService.currentReponse.prixTotal);
    }
    else{
      this.typeProduitCtrl = this.form.control("cacao", Validators.required);
      this.numBordCtrl = this.form.control(this.currentCodeBordereau, Validators.required);
      this.nomExportateurCtrl = this.form.control("", Validators.required)
      this.numCarteProExportateurCtrl = this.form.control(this.userService.currentUser.numCartePro, Validators.required)
      this.nomEntrepriseExportateurCtrl = this.userService.currentUser.nomStructure
      this.codeEntrepriseExportateurCtrl = this.userService.currentUser.codeStructure
      this.nomVendeurCtrl = this.form.control("", Validators.required);
      this.numeroVendeurCtrl = this.form.control("",Validators.required);
      this.emailVendeurCtrl = this.form.control("");
      this.nomCooperativeCtrl = this.form.control("",Validators.required);
      this.numeroCooperativeCtrl = this.form.control("");
      this.emailCooperativeCtrl = this.form.control("");
      this.regionVenteCtrl = this.form.control(this.Regions[0].nom,Validators.required);
      this.departementVenteCtrl = this.form.control(this.Regions[0].departements[0].nom,Validators.required);
      this.arrondissementVenteCtrl = this.form.control(this.Regions[0].departements[0].arrondissements[0].nom,Validators.required);
      this.dateVenteCtrl = this.form.control(this.formatDate(this.date),Validators.required);
      this.lieuVenteCtrl = this.form.control("",Validators.required);
      this.volumeCacaoGrade1Ctrl = this.form.control(0,Validators.required);
      this.volumeCacaoGrade2Ctrl = this.form.control(0,Validators.required);
      this.volumeArabicaCtrl = this.form.control(0,Validators.required);
      this.volumeRobustaCtrl = this.form.control(0,Validators.required);
      this.volumeTotalCtrl = this.form.control(0);
      this.prixCacaoGrade1Ctrl = this.form.control(0,Validators.required);
      this.prixCacaoGrade2Ctrl = this.form.control(0,Validators.required);
      this.prixArabicaCtrl = this.form.control(0,Validators.required);
      this.prixRobustaCtrl = this.form.control(0,Validators.required);
      this.prixTotalCtrl = this.form.control(0);
    }
  }
  private initForm(){
    this.bordereauForm = this.form.group({
      numBordereau : this.numBordCtrl,
      typeProduit : this.typeProduitCtrl,
      nomExportateur : this.nomExportateurCtrl,
      numCarteProExportateur : this.numCarteProExportateurCtrl,
      nomEntrepriseExportateur : this.nomEntrepriseExportateurCtrl,
      codeEntrepriseExportateur : this.codeEntrepriseExportateurCtrl,
      nomVendeur : this.nomVendeurCtrl,
      numeroVendeur : this.numeroVendeurCtrl,
      emailVendeur : this.emailVendeurCtrl,
      nomCooperative : this.nomCooperativeCtrl,
      numeroCooperative : this.numeroCooperativeCtrl,
      emailCooperative : this.emailCooperativeCtrl,
      regionVente : this.regionVenteCtrl,
      departementVente : this.departementVenteCtrl,
      arrondissmentVente : this.arrondissementVenteCtrl,
      dateVente : this.dateVenteCtrl,
      lieuVente : this.lieuVenteCtrl,
      volumeCacaoGrade1 : this.volumeCacaoGrade1Ctrl,
      volumeCacaoGrade2 : this.volumeCacaoGrade2Ctrl,
      volumeArabica : this.volumeArabicaCtrl,
      volumeRobusta : this.volumeRobustaCtrl,
      volumeTotal : this.volumeTotalCtrl,
      prixCacaoGrade1 : this.prixCacaoGrade1Ctrl,
      prixCacaoGrade2 : this.prixCacaoGrade2Ctrl,
      prixArabica : this.prixArabicaCtrl,
      prixRobusta : this.prixRobustaCtrl,
      prixTotal : this.prixTotalCtrl,
    })
  }
  change(){
    this.regionVenteCtrl.valueChanges.subscribe((value) =>this.affect("region", value));
    this.departementVenteCtrl.valueChanges.subscribe((value) =>this.affect("departement", value))
  }
  affect(typeLocal : string, value : string){
    // console.log(typeLocal, value)
    if(typeLocal == "region"){
      this.currentRegionIndex = Regions.findIndex(region => region.nom == value);
    }
    else if(typeLocal == "departement"){
      this.currentDepartementIndex = Regions[this.currentRegionIndex].departements.findIndex(departement => departement.nom == value);
    }
  }

  ajouterProducteur(){
    this.gestionService.producteurs.push({nom : '', phone : '', region : '', departement : '', arrondissment : '', lieuDit : '', quantite : 0, geometrie:''})
  }

  validerBordereau(){
    let valid = true;
    Object.keys(this.bordereauForm.controls).forEach(key =>{
      let validKey = false;
      if(this.bordereauForm.get(key)?.value !=""){
        validKey = true;
      }else if(this.bordereauForm.get(key)?.value =="" && !["volumeCacaoGrade1", "volumeCacaoGrade2", "volumeRobusta", "volumeTotal", "volumeArabica", "prixCacaoGrade1", "prixCacaoGrade2", "prixRobusta", "prixArabica", "prixTotal"].includes(key)){
        validKey = false;
        this.texte = this.texte + " " + key;
      }
      else if(this.bordereauForm.get(key)?.value =="" && ["volumeCacaoGrade1", "volumeCacaoGrade2", "volumeRobusta", "volumeTotal", "volumeArabica", "prixCacaoGrade1", "prixCacaoGrade2", "prixRobusta", "prixArabica", "prixTotal"].includes(key)){
        validKey = true;
      }
      else{console.log(key);}
      valid = valid && validKey;
    })
    if(this.gestionService.producteurs.length == 0){valid=false; this.texte = this.texte +  " liste de producteurs"}
    return valid;
  }

  send(){
    const checkbox = document.getElementById("confirm") as HTMLInputElement;
    console.log(this.bordereauForm.value);
    
    if(checkbox?.checked){
      console.log(this.gestionService.producteurs);
      if(this.validerBordereau()){
        this.texte = "";
        if(this.gestionService.currentReponse != undefined){
          this.Bordereau.nomEntrepriseExportateur = this.gestionService.currentReponse.nomEntrepriseExportateur;
          this.Bordereau.codeEntrepriseExportateur = this.gestionService.currentReponse.codeEntrepriseExportateur; 
          this.Bordereau.idExportateur = this.gestionService.currentReponse.idExportateur;
          this.Bordereau.typeProduit = this.gestionService.currentReponse.typeProduit;
          this.Bordereau.numBordereau = this.gestionService.currentReponse.numBordereau;
        }
        else if(this.gestionService.currentReponse == undefined){
          this.Bordereau.nomEntrepriseExportateur = this.userService.currentUser.nomStructure;
          this.Bordereau.codeEntrepriseExportateur = this.userService.currentUser.codeStructure; 
          this.Bordereau.idExportateur = this.authService.userId;
          this.Bordereau.numBordereau = this.currentCodeBordereau;
        }
         
        this.Bordereau.nomExportateur = this.bordereauForm.get("nomExportateur")?.value;
        this.Bordereau.numCarteProExportateur = this.bordereauForm.get("numCarteProExportateur")?.value;
        this.Bordereau.nomVendeur = this.bordereauForm.get("nomVendeur")?.value;
        this.Bordereau.numeroVendeur = this.bordereauForm.get("numeroVendeur")?.value; 
        this.Bordereau.emailVendeur = this.bordereauForm.get("emailVendeur")?.value; 
        this.Bordereau.nomCooperative = this.bordereauForm.get("nomCooperative")?.value; 
        this.Bordereau.numeroCooperative = this.bordereauForm.get("numeroCooperative")?.value;
        this.Bordereau.emailCooperative  = this.bordereauForm.get("emailCooperative")?.value; 
        this.Bordereau.regionVente = this.bordereauForm.get("regionVente")?.value; 
        this.Bordereau.departementVente = this.bordereauForm.get("departementVente")?.value;
        this.Bordereau.arrondissementVente = this.bordereauForm.get("arrondissmentVente")?.value;
        this.Bordereau.dateVente = this.bordereauForm.get("dateVente")?.value;
        this.Bordereau.lieuVente = this.bordereauForm.get("lieuVente")?.value;
        this.Bordereau.typeProduit = this.bordereauForm.get("typeProduit")?.value;
        if(this.bordereauForm.get("typeProduit")?.value == 'cacao'){
          this.Bordereau.volumeCacaoGrade1 = this.bordereauForm.get("volumeCacaoGrade1")?.value;
          this.Bordereau.volumeCacaoGrade2 = this.bordereauForm.get("volumeCacaoGrade2")?.value;
          this.Bordereau.volumeTotal = parseFloat(this.bordereauForm.get("volumeCacaoGrade1")?.value) + parseFloat(this.bordereauForm.get("volumeCacaoGrade2")?.value);
          this.Bordereau.prixTotal = parseFloat(this.bordereauForm.get("prixCacaoGrade1")?.value) + parseFloat(this.bordereauForm.get("prixCacaoGrade2")?.value);
          this.Bordereau.prixCacaoGrade1 = this.bordereauForm.get("prixCacaoGrade1")?.value;
          this.Bordereau.prixCacaoGrade2 = this.bordereauForm.get("prixCacaoGrade2")?.value;
          this.Bordereau.volumeArabica = 0;
          this.Bordereau.volumeRobusta = 0;
          this.Bordereau.prixArabica = 0;
          this.Bordereau.prixRobusta = 0;
        }
        else if(this.bordereauForm.get("typeProduit")?.value == 'cafeArabica'){
          this.Bordereau.volumeArabica = this.bordereauForm.get("volumeArabica")?.value;
          this.Bordereau.prixArabica = this.bordereauForm.get("prixArabica")?.value;
          this.Bordereau.volumeTotal = this.bordereauForm.get("volumeArabica")?.value;
          this.Bordereau.prixTotal = this.bordereauForm.get("prixArabica")?.value;
          this.Bordereau.volumeRobusta = 0;
          this.Bordereau.prixRobusta = 0;
          this.Bordereau.volumeCacaoGrade1 = 0
          this.Bordereau.volumeCacaoGrade2 = 0;
          this.Bordereau.prixCacaoGrade1 = 0;
          this.Bordereau.prixCacaoGrade2 = 0;
        }
        else{
          this.Bordereau.volumeRobusta = this.bordereauForm.get("volumeRobusta")?.value;
          this.Bordereau.prixRobusta = this.bordereauForm.get("prixRobusta")?.value;
          this.Bordereau.volumeTotal = this.bordereauForm.get("volumeRobusta")?.value;
          this.Bordereau.prixTotal = this.bordereauForm.get("prixRobusta")?.value;
          this.Bordereau.volumeArabica = 0;
          this.Bordereau.prixArabica = 0;
          this.Bordereau.volumeCacaoGrade1 = 0
          this.Bordereau.volumeCacaoGrade2 = 0;
          this.Bordereau.prixCacaoGrade1 = 0;
          this.Bordereau.prixCacaoGrade2 = 0;
        }
        this.Bordereau.producteurList = this.gestionService.producteurs;
        
        const fichier = document.getElementById("bord") as HTMLInputElement
        if(fichier?.files?.length){this.Bordereau.fichier = fichier.files[0]}
        console.log(this.Bordereau);

        if(this.gestionService.currentReponse==undefined){
          this.loading = true;
          this.border.createBordereau(this.Bordereau).pipe(
            catchError((error:any)=>{
              this.loading = false;
              this.texte ="Requête invalide bordereau non crée!"; this.typeP="error";
              this.popupService.showPopup(this.texte, this.typeP);
              return throwError(()=>error)
            })
          )
          .subscribe((res)=>{
            this.loading = false;
            this.texte ="Bordereau crée avec success"; this.typeP="success";
            this.popupService.showPopup(this.texte, this.typeP);
            this.viewSubmit = false
            setTimeout(() => {
              this.back();
            }, 3000);
          });
        
        }else{
          this.loading = true;
          this.border.updateBordereau(this.gestionService.currentReponse._id,this.Bordereau).pipe(
            catchError((error:any)=>{
              this.loading = false;
              this.texte ="Requête invalide ou bordereau non trouvé!"; this.typeP="error";
              this.popupService.showPopup(this.texte, this.typeP);
              return throwError(()=>error)
            })
          ).subscribe((res)=>{
            this.loading = false;
            this.texte ="Bordereau modifié avec success"; this.typeP="success";
            this.popupService.showPopup(this.texte, this.typeP);
            this.viewSubmit = false
            setTimeout(() => {
              this.back();
            }, 3000);
          });
        }
      }else{
        this.texte = this.texte + " manquants"; this.typeP = "warning";
        this.popupService.showPopup(this.texte, this.typeP);
      }
    }
    else{
        this.texte = "Vous n'avez pas confirmer que vos informations sont correctes"; this.typeP = "warning";
        this.popupService.showPopup(this.texte, this.typeP);
        this.texte = "";
    }
  }
  back(){
    this.router.navigateByUrl("/gestion/bordereaux")
  }
  goToHistorique(){
    this.router.navigateByUrl("/gestion");
  }

  formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  generateRandomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    return code;
  }
  load(type:string){
    if(type == "producteur"){
      let inputFile = document.getElementById("producteurF") 
      inputFile?.click();
    }else{
      let inputFile = document.getElementById("bord") ;
      inputFile?.click();
    }
  }
  onBordereauSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.fileBordereauName = file.name;
  }
  // Méthode pour importer un fichier Excel
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.fileProducteurName = file.name;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Supposons que les données sont dans la première feuille
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertir les données de la feuille en JSON
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Mapper les données dans le tableau des producteurs
      this.mapExcelDataToProducteurs(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }

  // Mapper les données Excel dans le tableau des producteurs
  private mapExcelDataToProducteurs(data: any[]): void {
    // Supposons que les colonnes sont : Nom, Téléphone, Région, Département, Arrondissement, LieuDit, Quantité
    data.slice(1).forEach((row) => {
      if (row.length >= 7) {
        this.gestionService.producteurs.push({
          nom: row[0] || '',
          phone: row[1] || '',
          dateDenaissance: new Date(),
          region: row[2] || '',
          departement: row[3] || '',
          arrondissement: row[4] || '',
          lieuDit: row[5] || '',
          quantite: row[6] || 0,
          geometrie: '',
        });
      }
    });
  }
}
