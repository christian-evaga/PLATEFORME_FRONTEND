import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerificateurService } from '../../services/verificateur.service';
import { RequeteService } from '../../../core/services/requete.service';
import { AuthService } from '../../../core/services/auth.service';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-reponse',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './list-reponse.component.html',
  styleUrl: './list-reponse.component.scss'
})
export class ListReponseComponent {
  //variables du dataTables
  cols = [
    {field: 'idBordereau', header: 'Numéro bordereau' },
    {field:'dateDeSoumission', header:'Date de soumission'},
    {field:'producteurList', header:'Nombre de producteurs'},
    {field:'statut', header:'Statut'},
  ];
  requetes: any ;
  datas: any = [];
  currentRequest: any;

  constructor(
    private router : Router,
    private verificateurService: VerificateurService,
    private requeteService: RequeteService,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.initTable();
  }

  initTable(){
    this.currentRequest = this.verificateurService.currentRequest;
    this.requeteService.getAllRequeteByPriority(1).then((data: any) => {
      this.requetes = data.filter((requete: any) => requete.statut === 'answer').sort((a: any , b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
  }
}
