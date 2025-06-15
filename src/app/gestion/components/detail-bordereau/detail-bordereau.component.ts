import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../services/gestion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-bordereau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-bordereau.component.html',
  styleUrl: './detail-bordereau.component.scss'
})
export class DetailBordereauComponent implements OnInit{
  currentReponse!:any;
  constructor(
    public gestionService : GestionService,
    private router : Router
  ){}
  ngOnInit(): void {
    this.currentReponse = this.gestionService.currentReponse
  }
  goToHistorique(){
    this.router.navigateByUrl("/gestion");
  }
  goToReponse(){
    this.router.navigateByUrl("/gestion/reponses");
  }
  modifierBordereau(){
    this.router.navigateByUrl("/gestion/add-bordereau");
  }
}
