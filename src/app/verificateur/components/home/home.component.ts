import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { VerificateurService } from '../../services/verificateur.service';
import { BordereauxService } from '../../../core/services/bordereaux.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
  bordereauxAccept: any = [] ;
  bordereauxReject: any = [] ;
  loading: boolean = false;

  constructor(
    private router : Router,
    private verificateurService: VerificateurService,
    private bordereauxService: BordereauxService
  ){}
  ngOnInit(): void {
    this.getBordereaus();
  }

  getBordereaus(){
    this.loading = true;
    this.bordereauxService.getAllBordereauxByStatut("send").then((data: any) => {
      this.bordereaux = [...this.bordereaux ,...data];
    })
    this.bordereauxService.getAllBordereauxByStatut("pending").then((data: any) => {
      this.loading = false;
      this.bordereaux = [...this.bordereaux ,...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
    })
    this.bordereauxService.getAllBordereauxByStatut("verify").then((data: any) => {
      this.bordereauxAccept = [...this.bordereauxAccept ,...data];
    })
    this.bordereauxService.getAllBordereauxByStatut("answered").then((data: any) => {
      this.bordereauxAccept = [...this.bordereauxAccept ,...data];
    })
    this.bordereauxService.getAllBordereauxByStatut("reject").then((data: any) => {
      this.bordereauxReject = [...this.bordereauxReject ,...data];
    })
  }

  clear(table: Table){
    table.clear()
  }
  filter(dt:Table, event:any){
    dt.filterGlobal(event.target.value, 'contains')
  }
  goToVerificationCheck(bordereau: any){
    this.verificateurService.bordereauToVerify = bordereau;
    this.router.navigateByUrl("/verificateur/check");
  }
}
