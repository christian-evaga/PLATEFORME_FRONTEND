import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { BordereauxService } from '../../../core/services/bordereaux.service';
import { GestionService } from '../../services/gestion.service';
import { LoadingComponent } from "../../../share/components/loading/loading.component";


@Component({
  selector: 'app-bordereaux',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, LoadingComponent],
  templateUrl: './bordereaux.component.html',
  styleUrl: './bordereaux.component.scss'
})
export class BordereauxComponent implements OnInit{
  //variables du dataTables
  cols = [
    {field: 'numBordereau', header: 'Numero de bordereau'},
    {field:'nomExportateur', header:"Nom du mandataire"},
    {field: 'nomCooperative', header: 'Nom coopérative' },
    {field:'nbreProducteur', header:'Nombre de producteurs'},
    {field:'lieuVente', header:'Lieu du marché'},
    {field:'dateVente', header:'Date de l\'achat'},
    {field:'statut', header:'Statut'},
  ];
  bordereaux!:any;
  view = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private bordereauService : BordereauxService,
    public gestionService : GestionService
  ){}
  ngOnInit(): void {
    // this.bordereaux = this.bordereauService.allBordereauxUser;
    // console.log(this.bordereaux);
    this.loading = true;
    this.bordereauService.bordereaux$.subscribe(data => {
      this.loading = false;
      this.bordereaux = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  }
  clear(table: Table){
    table.clear()
  }
  filter(dt:Table, event:any){
    dt.filterGlobal(event.target.value, 'contains')
  }
  goToHistorique(){
    this.router.navigateByUrl("/gestion");
  }
  addNewBordereau(){
    this.gestionService.currentReponse=undefined;
    this.gestionService.producteurs= [{nom:"", phone:"", region:"", Departement:"", arrondissement:"", lieuDit:"", quantite:0}];
    this.gestionService.producteurs.pop();
    this.router.navigateByUrl("/gestion/add-bordereau");
  }
  // viewMenu(){
  //   if(!this.view){this.view = true}
  //   else{this.view = false}
  // }
  annuler(){
    this.view = false;
  }
  action(bordereau:any){
    if(bordereau.statut == 'pending' || bordereau.statut == 'send' || bordereau.statut == 'verify'){this.view = true}
    else{
      this.gestionService.currentReponse = bordereau;
      this.gestionService.producteurs = bordereau.producteurList
      this.router.navigateByUrl("/gestion/detail-bordereau");
      this.view = false
    }
  }
}
