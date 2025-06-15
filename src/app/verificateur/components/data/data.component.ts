import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerificateurService } from '../../services/verificateur.service';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-data',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {
  //variables du dataTables
  cols = [
    {field: 'nom', header: 'Nom du producteur' },
    {field: 'prenom', header: 'Prénom du producteur' },
    {field: 'dateNaissance', header: 'Date de naissance' },
    {field:'region', header:'Région'},
    {field:'departement', header:'Département'},
    {field:'arrondissement', header:'Arrondissement'},
    {field: 'geometrie', header: 'Géometries' },
  ];

  tableData: {
    nom: string;
    prenom: string;
    dateNaissance: string;
    region: string;
    departement: string;
    arrondissement: string;
    geometrie: string;
  }[] = [];

  itemsPerPage = 10;
  currentPage = 1;

  modifiedGeoJSON: any

  constructor(
    private router: Router,
    private verificateurService: VerificateurService,
    private http: HttpClient
  ){}
  ngOnInit(): void {
    this.tableData = this.verificateurService.data
  }
  goToHome(){
    this.router.navigateByUrl("/home-si");
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const geojson = JSON.parse(reader.result as string);
        if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
          // Charger directement les données dans tableData
            this.tableData = geojson.features.map((feature: any) => {
            const props = feature.properties;
            const geom = feature.geometry;
            return {
              nom: props['Nom(s)'] || '',
              prenom: props['Prenom(s)'] || '',
              dateNaissance: props['Né(e) le'] || '',
              region: props['Région'] || '',
              departement: props['Départe'] || '',
              arrondissement: props['Arrond'] || '',
              geometrie: JSON.stringify(geom),
            };
          });
          this.verificateurService.data = this.tableData
        } else {
          console.error('Le fichier GEOJSON n\'est pas valide.');
        }
      } catch (err) {
        console.error('Erreur lors de l’analyse du fichier GEOJSON:', err);
      }
    };

    reader.readAsText(file);
  }
  
  clear(table: Table){
    table.clear()
  }

  filter(dt:Table, event:any){
    dt.filterGlobal(event.target.value, 'contains')
  }
}