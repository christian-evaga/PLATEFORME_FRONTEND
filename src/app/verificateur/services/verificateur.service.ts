import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificateurService {
  public list = []

  public bordereauToVerify: any;
  public currentRequest: any = {
    idBirdereau: '',
    dateDeSoumission: '',
    producteurList: [],
    statut: '',
  };

  data: {
    nom: string;
    prenom: string;
    dateNaissance: string;
    region: string;
    departement: string;
    arrondissement: string;
    geometrie: string;
  }[] = [];

  private storageKey = 'geojsonFiles';
  
  constructor(
    private http: HttpClient
  ) { 
    this.loadGeoJSON();
  }

  loadGeoJSON() {
    this.http.get('./assets/datas/Jeu_donnees.geojson').subscribe(
      (geojson: any) => {
        if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
          // Mapper les données du fichier GEOJSON dans tableData
          this.data = geojson.features.map((feature: any) => {
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
        } else {
          console.error('Le fichier GEOJSON n\'est pas valide.');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement du fichier GEOJSON:', error);
      }
    );
  }

  public getListBordereau() {
    return this.list ;
  }
}
