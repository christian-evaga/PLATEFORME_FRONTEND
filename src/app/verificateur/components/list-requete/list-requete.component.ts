import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerificateurService } from '../../services/verificateur.service';
import { BordereauxService } from '../../../core/services/bordereaux.service';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RequeteService } from '../../../core/services/requete.service';
import { AuthService } from '../../../core/services/auth.service';
import { PopupComponent } from "../../../share/components/popup/popup.component";
import { PopupService } from '../../../core/services/popup.service';
import { LoadingComponent } from "../../../share/components/loading/loading.component";

@Component({
  selector: 'app-list-requete',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, PopupComponent, LoadingComponent],
  templateUrl: './list-requete.component.html',
  styleUrl: './list-requete.component.scss'
})
export class ListRequeteComponent {
  //variables du dataTables
  cols = [
    {field: 'idBordereau', header: 'Numéro bordereau' },
    {field:'dateDeSoumission', header:'Date de soumission'},
    {field:'producteurList', header:'Nombre de producteurs'},
    {field:'statut', header:'Statut'},
  ];
  requetes: any = [] ;
  datas: any = [];
  currentRequest: any;
  loading: boolean = false;

  constructor(
    private router : Router,
    private verificateurService: VerificateurService,
    private requeteService: RequeteService,
    private authService: AuthService,
    private popupService : PopupService,
  ){}

  ngOnInit(): void {
    this.initTable();
  }

  initTable(){
    this.loading = true;
    this.currentRequest = this.verificateurService.currentRequest;
    this.requeteService.getAllRequeteByPriority(1).then((data: any) => {
      this.loading = false;
      this.requetes = data.filter((requete: any) => requete.statut === 'send');
    })
    this.datas = this.verificateurService.data;
  }
  
  clear(table: Table){
    table.clear()
  }

  filter(dt:Table, event:any){
    dt.filterGlobal(event.target.value, 'contains')
  }
  
  goToHome(){
    this.router.navigateByUrl("/home-si");
  }

  verifierRequete(requete: any){
    this.currentRequest = requete;

    // Parcourir chaque producteur de la liste
    this.currentRequest.producteurList.forEach((producteur: any) => {
      // Chercher les correspondances dans la table datas
      const correspondances = this.datas.filter((data: any) => 
        data.nom.toLowerCase() === producteur.nom.toLowerCase() &&
        data.region.toLowerCase() === producteur.region.toLowerCase() &&
        data.departement.toLowerCase() === producteur.departement.toLowerCase() &&
        data.arrondissement.toLowerCase() === producteur.arrondissement.toLowerCase()
      );

      // Si des correspondances sont trouvées, prendre la première et mettre à jour le champ geometrie
      if (correspondances.length > 0) {
        producteur.geometrie = correspondances[0].geometrie;
      } else {
        // Si aucune correspondance n'est trouvée, on peut laisser le champ vide ou ajouter une valeur par défaut
        producteur.geometrie = '';
      }
    });
  }

  answer(){
    this.loading = true;
    this.currentRequest.statut = "answered"
    this.currentRequest.idOwner = this.authService.userId;
    this.requeteService.updateRequete(this.currentRequest._id, this.currentRequest).subscribe((res)=>{
      this.loading = false;
      this.popupService.showPopup("Requete repondu avec success", "success");
      this.requeteService.getAllRequeteByPriority(1).then((data: any) => {
        this.requetes = data.filter((requete: any) => requete.statut === 'send');
      })
    })
  }
}
