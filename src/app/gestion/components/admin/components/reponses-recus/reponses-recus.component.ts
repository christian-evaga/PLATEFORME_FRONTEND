import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { GestionService } from '../../../../services/gestion.service';
import { BordereauxService } from '../../../../../core/services/bordereaux.service';
import { LoadingComponent } from "../../../../../share/components/loading/loading.component";

@Component({
  selector: 'app-reponses-recus',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, LoadingComponent],
  templateUrl: './reponses-recus.component.html',
  styleUrl: './reponses-recus.component.scss'
})
export class ReponsesRecusComponent implements OnInit{
  cols = [
    {field:'numBordereau', header: 'Numero de bordereau'},
    {field:'nomExportateur', header:"Nom du mandataire"},
    {field:'nomCooperative', header: 'Nom coopérative' },
    {field:'nbreProducteur', header:'Nombre de producteurs'},
    {field:'lieuVente', header:'Lieu du marché'},
    {field:'dateVente', header:'Date de l\'achat'},
    {field:'statut', header:'Statut'},
  ];
  bordereaux: any = []
  loading: boolean = false;

  constructor(
    private router : Router,
    private gestionService : GestionService,
    private bordereauService: BordereauxService
  ){}
  ngOnInit(): void {
    this.initTable();
  }
  
  initTable(){
    this.loading = true;
    this.bordereauService.getAllBordereauxByStatut("verify").then((res)=> {
      this.loading = false;
      this.bordereaux = res
    })
  }
  goToAdmin(){this.router.navigateByUrl("gestion/admin")}
    clear(table: Table){
      table.clear()
  }
  filter(dt:Table, event:any){
    dt.filterGlobal(event.target.value, 'contains')
  }
  goToInfo(bordereau:any){
    this.gestionService.currentBordereauAdmin = bordereau;
    this.router.navigateByUrl("gestion/admin/info-bordereau-recu")
  }
}
