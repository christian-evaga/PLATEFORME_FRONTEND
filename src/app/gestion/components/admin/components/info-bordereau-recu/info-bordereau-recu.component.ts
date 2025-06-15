import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionService } from '../../../../services/gestion.service';
import { CommonModule } from '@angular/common';
import { RequeteService } from '../../../../../core/services/requete.service';
import { BordereauxService } from '../../../../../core/services/bordereaux.service';
import { PopupComponent } from "../../../../../share/components/popup/popup.component";
import { PopupService } from '../../../../../core/services/popup.service';
import { LoadingComponent } from "../../../../../share/components/loading/loading.component";

@Component({
  selector: 'app-info-bordereau-recu',
  standalone: true,
  imports: [CommonModule, PopupComponent, LoadingComponent],
  templateUrl: './info-bordereau-recu.component.html',
  styleUrl: './info-bordereau-recu.component.scss'
})
export class InfoBordereauRecuComponent implements OnInit{
  bordereau!:any;
  answers: any;
  loading: boolean = false;

  constructor(
    private router : Router,
    private gestionService : GestionService,
    private requeteService: RequeteService,
    private bordereauService: BordereauxService,
    private popupService : PopupService,
  ){}
  ngOnInit(): void {
    this.getAnswer()
  }

  getAnswer(){
    this.loading = true;
    this.bordereau = this.gestionService.currentBordereauAdmin;
    this.requeteService.getAnswerByBordereau(this.bordereau.numBordereau).subscribe((res)=> {
      this.loading = false;
      this.answers = res
      console.log(this.answers);
      this.matchAnswer(this.answers)
    })
  }

  matchAnswer(answers: any){
    // Parcourir chaque producteur de la liste
    for (let i = 0; i < this.bordereau.producteurList.length; i++) {
      for (let j = 0; j < answers.length; j++) {
        // Vérifier si la liste des producteurs existe dans answers[j]
        if (answers[j].producteurList && answers[j].producteurList[i]) {
          // Vérifier si le champ geometrie n'est pas vide
          if (answers[j].producteurList[i].geometrie !== "") {
            this.bordereau.producteurList[i].geometrie = answers[j].producteurList[i].geometrie;
          }
        }
      }
    }
  }

  completeResponse(){
    this.loading = true;
    this.bordereau.statut = "answered"
    this.bordereauService.updateBordereau(this.bordereau._id, this.bordereau).subscribe((res)=> {
      this.loading = false;
      this.popupService.showPopup("Bordereau repondu avec success", "success");
      this.goToBordereaux();
    })
  }

  goToAdmin(){this.router.navigateByUrl("gestion/admin")}
  goToBordereaux(){this.router.navigateByUrl("gestion/admin/reponses-recues")}
}
