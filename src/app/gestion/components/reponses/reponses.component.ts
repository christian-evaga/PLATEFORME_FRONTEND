import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { GestionService } from '../../services/gestion.service';
import {BordereauxService} from '../../../core/services/bordereaux.service'
import { LoadingComponent } from "../../../share/components/loading/loading.component";

@Component({
  selector: 'app-reponses',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, LoadingComponent],
  templateUrl: './reponses.component.html',
  styleUrl: './reponses.component.scss'
})
export class ReponsesComponent implements OnInit{
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
  loading: boolean = false;

  constructor(
    private router : Router,
    public gestionService : GestionService,
    private bordereauService : BordereauxService
  ){}
  ngOnInit(): void {
    this.bordereaux = this.bordereauService.allBordereauxUser;
    this.loading = true;
    this.bordereauService.bordereaux$.subscribe(data => {
      this.loading = false;
      this.bordereaux = data.filter(bor => bor.statut == "answered" || bor.statut == "reject").sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
    console.log(this.bordereaux);
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
  goTodetail(bordereau:any){
    this.gestionService.currentReponse = bordereau;
    this.gestionService.producteurs = bordereau.producteurList
    this.router.navigateByUrl("/gestion/detail-bordereau");
  }
}
