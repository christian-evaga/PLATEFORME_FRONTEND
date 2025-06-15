import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BordereauxService } from '../../../core/services/bordereaux.service';
import { VerificateurService } from '../../services/verificateur.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RequeteService } from '../../../core/services/requete.service';
import { PopupComponent } from "../../../share/components/popup/popup.component";
import { PopupService } from '../../../core/services/popup.service';
import { LoadingComponent } from "../../../share/components/loading/loading.component";
import { environment } from '../../../../environment/environment.test';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PopupComponent, LoadingComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {
  verifInfoExportateur!:FormControl;
  verifInfoVente!: FormControl;
  verifInfoQuantite!: FormControl;
  rapportInfoExportateur!: FormControl;
  rapportInfoVente!:FormControl;
  rapportInfoQuantite!:FormControl; 

  bordereauVerifie: any;
  volumeCumul: number = 0;
  loading: boolean = false;

  constructor(
    private router: Router,
    private form : FormBuilder,
    private bordereauxService : BordereauxService,
    private verificateurService: VerificateurService,
    private authService: AuthService,
    private requeteService: RequeteService,
    private popupService : PopupService,
  ){}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.bordereauVerifie = this.verificateurService.bordereauToVerify;
    if(this.bordereauVerifie == null || (this.bordereauVerifie.statut == "pending"&& this.bordereauVerifie.idVerificateur!=this.authService.userId)){
      this.popupService.showPopup("Ce bordereau déjà en cours de vérification par un autre verificateur", "warning");
      this.router.navigateByUrl("/verificateur/list");
    }
    this.makePending(this.bordereauVerifie)
    this.verifInfoExportateur = new FormControl(this.bordereauVerifie.verifInfoExportateur, Validators.required);
    this.verifInfoVente = new FormControl(this.bordereauVerifie.verifInfoVente, Validators.required);
    this.verifInfoQuantite = new FormControl(this.bordereauVerifie.verifInfoQuantite, Validators.required);
    this.rapportInfoExportateur = new FormControl(this.bordereauVerifie.rapportInfoExportateur, Validators.required);;
    this.rapportInfoVente = new FormControl(this.bordereauVerifie.rapportInfoVente, Validators.required);
    this.rapportInfoQuantite = new FormControl(this.bordereauVerifie.rapportInfoQuantite, Validators.required); 
    this.calculVolume(this.bordereauVerifie.producteurList)
  }
  calculVolume(table: any){
    table.forEach((producteur:any) => {
      if(producteur.quantite) this.volumeCumul += producteur.quantite;
    });
  }
  goToListBordereau(id: Number){
    id == 1 ? this.router.navigateByUrl("/verificateur"): this.router.navigateByUrl("/verificateur/list");
  }

  makePending(bordereau: any){
    bordereau.statut = "pending"
    bordereau.idVerificateur = this.authService.userId;
    this.bordereauxService.updateBordereau(this.bordereauVerifie._id, bordereau).subscribe((data) => {
    })
  }

  verifierBordereau(statut: string){
    let bordereau = this.bordereauVerifie
    bordereau.statut = statut;
    bordereau.verifInfoExportateur = this.verifInfoExportateur.value,
    bordereau.verifInfoVente = this.verifInfoVente.value,
    bordereau.verifInfoQuantite = this.verifInfoQuantite.value,
    bordereau.rapportInfoExportateur = this.rapportInfoExportateur.value,
    bordereau.rapportInfoVente = this.rapportInfoVente.value,
    bordereau.rapportInfoQuantite = this.rapportInfoQuantite.value,
    this.loading = true;
    this.bordereauxService.updateBordereau(this.bordereauVerifie._id, bordereau).subscribe((data) => {
      if(statut == "verify"){
        let requete = {
          idOwner: this.authService.userId,
          idBordereau: bordereau.numBordereau,
          ipServer: environment.ipServer,
          dateDeSoumission: bordereau.createdAt,
          producteurList: bordereau.producteurList
        }
        console.log(requete)
        this.requeteService.createRequete(requete).subscribe((res)=>{
          this.loading = false;
          this.popupService.showPopup("Bordereau vérifié avec succès.", "success");
          this.router.navigateByUrl("/verificateur/list");
        })
      }
      else{
        this.loading = false;
        this.popupService.showPopup("Bordereau rejeté avec succès.", "success");
        this.router.navigateByUrl("/verificateur/list");
      }
    })
  }
}
