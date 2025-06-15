import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export class GestionService {
    currentReponse!:any;
    currentUserCreated!:any;
    currentBordereauAdmin!:any;
    currentUserType!:string;
    producteurs : any = ['']
    constructor(
        private http : HttpClient
    ){
        this.producteurs.pop();
    }

    formatDate(date:Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
      }
    downloadLocalisationsJson(data : any){
        const localisations = JSON.stringify(data);
        const blob = new Blob([localisations], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'localisations.json';
        a.click();
    }
    downloadPdf(name: string) {
      const url = 'assets/datas/'+name+'.pdf';
      this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = name+'.pdf';
        a.click();
        window.URL.revokeObjectURL(a.href);
      });
    }
    downloadExcell() {
      const url = 'assets/datas/producteurs.ods';
      this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'liste de producteurs.ods';
        a.click();
        window.URL.revokeObjectURL(a.href);
      });
    }
}