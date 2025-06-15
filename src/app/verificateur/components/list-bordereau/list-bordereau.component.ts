import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerificateurService } from '../../services/verificateur.service';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BordereauxService } from '../../../core/services/bordereaux.service';
import { LoadingComponent } from "../../../share/components/loading/loading.component";

@Component({
  selector: 'app-list-bordereau',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, LoadingComponent],
  templateUrl: './list-bordereau.component.html',
  styleUrl: './list-bordereau.component.scss'
})
export class ListBordereauComponent {

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
    bordereaux: any = [] ;
    loading: boolean = false;
  
    constructor(
      private router : Router,
      private verificateurService: VerificateurService,
      private bordereauxService: BordereauxService
    ){}

    ngOnInit(): void {
      this.initTable();
    }

    initTable(){
      this.loading = true;
      this.bordereauxService.getAllBordereauxByStatut("send").then((data: any) => {
        this.bordereaux = [...this.bordereaux ,...data];
      })
      this.bordereauxService.getAllBordereauxByStatut("pending").then((data: any) => {
        this.loading = false;
        this.bordereaux = [...this.bordereaux ,...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      })
    }
    
    clear(table: Table){
      table.clear()
    }

    filter(dt:Table, event:any){
      dt.filterGlobal(event.target.value, 'contains')
    }

    route(id: Number){
      id == 1 ? this.router.navigateByUrl("/verificateur"): this.router.navigateByUrl("/verificateur/check");
    }

    verifierBordereau(bordereau: any){
      this.verificateurService.bordereauToVerify = bordereau;
      this.router.navigateByUrl("/verificateur/check");
    }
}
