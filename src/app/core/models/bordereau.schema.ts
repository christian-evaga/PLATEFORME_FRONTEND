export class Bordereau {
    numBordereau!: string;
    typeProduit!:string;
  // information de l'exportateur
  idExportateur!: string;
  nomExportateur!: string;
  numCarteProExportateur!: string;
  nomEntrepriseExportateur!: string;
  codeEntrepriseExportateur!: string;
  // Information de la vente
  nomVendeur!: string;
  numeroVendeur!: string;
  emailVendeur!: string;
  nomCooperative!: string;
  numeroCooperative!: string;
  emailCooperative!: string;
  regionVente!: string;
  departementVente!: string;
  arrondissementVente!: string;
  dateVente!: Date;
  lieuVente!: string;
  typeCafe?:string;
  volumeCacaoGrade1!: number;
  volumeCacaoGrade2!: number;
  volumeArabica?: number;
  volumeRobusta?: number;
  volumeTotal!: number;
  prixCacaoGrade1!: number;
  prixCacaoGrade2!: number;
  prixArabica?: number;
  prixRobusta?: number;
  prixTotal!:number;
  producteurList! : [Producteur];
  fichier? : File;
}

export class Producteur{
    nom!: string;
    phone!: string;
    dateDeNaissance!: Date;
    region!: string;
    departement!: string;
    arrondissement!: string;
    lieuDit!: string;
    quantite!: number;
    geometrie?: string;
}