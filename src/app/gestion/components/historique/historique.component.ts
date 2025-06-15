import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { BordereauxService } from '../../../core/services/bordereaux.service';
import { AuthService } from '../../../core/services/auth.service';
import { GestionService } from '../../services/gestion.service';
import { LoadingComponent } from "../../../share/components/loading/loading.component";

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, LoadingComponent],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss'
})
export class HistoriqueComponent implements OnInit{
  //variables du dataTables
  cols = [
    {field:'numBordereau', header: 'Numero de bordereau'},
    {field:'nomExportateur', header:"Nom du mandataire"},
    {field:'nomCooperative', header: 'Nom coopérative' },
    {field:'nbreProducteur', header:'Nombre de producteurs'},
    {field:'lieuVente', header:'Lieu du marché'},
    {field:'dateVente', header:'Date de l\'achat'},
    {field:'statut', header:'Statut'},
  ];
  loading!: boolean;
  bordereaux!:any;
  RecentBordereaux!: any;
  bordereauxAccept: any = [];
  bordereauxReject: any = [];
  bordereauxPending: any = [];

  constructor(
    private router : Router,
    private authService: AuthService,
    private bordereauxService: BordereauxService,
    public gestionService : GestionService,
  ){}
  ngOnInit(): void {
    this.init();
  }

  init(){
    this.loading = true;
    this.bordereaux = this.bordereauxService.allBordereauxUser
    this.bordereauxService.bordereaux$.subscribe(data => {
      this.bordereaux = data;
      this.RecentBordereaux = data
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
          this.loading = false;
          });
    this.bordereauxService.bordereaux$.subscribe((data: any) => {
      this.bordereauxAccept = data.filter((bor:any) => bor.statut == "verify" || bor.statut == "answered");
    })
    this.bordereauxService.bordereaux$.subscribe((data: any) => {
      this.bordereauxPending = data.filter((bor:any) => bor.statut == "send" || bor.statut == "pending");
    })
    this.bordereauxService.bordereaux$.subscribe((data: any) => {
      this.bordereauxReject = data.filter((bor:any) => bor.statut == "reject");
    })
  }
  clear(table: Table){
    table.clear()
  }
  filter(dt:Table, event:any){
    dt.filterGlobal(event.target.value, 'contains')
  }
  addNewBordereau(){
    this.gestionService.currentReponse=undefined;
    this.gestionService.producteurs= [{nom:"", phone:"", region:"", Departement:"", arrondissement:"", lieuDit:"", quantite:0}];
    this.gestionService.producteurs.pop();
    this.router.navigateByUrl("/gestion/add-bordereau")
  }
}
