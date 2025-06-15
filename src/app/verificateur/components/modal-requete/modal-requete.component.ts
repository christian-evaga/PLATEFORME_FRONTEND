import { Component, Input } from '@angular/core';
import { VerificateurService } from '../../services/verificateur.service';

@Component({
  selector: 'app-modal-requete',
  standalone: true,
  imports: [],
  templateUrl: './modal-requete.component.html',
  styleUrl: './modal-requete.component.scss'
})
export class ModalRequeteComponent {
  @Input() requete: any = {
    idBirdereau: '',
    dateDeSoumission: '',
    producteurList: [],
    statut: '',
  };

  constructor(
    private verificateurService: VerificateurService,
  ) { }

  ngOnInit(): void {
    
  }

}
