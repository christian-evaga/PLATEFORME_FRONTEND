import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment.test";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, firstValueFrom, map, tap } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
    providedIn :'root'
})

export class VerificateurService{
    constructor(
        private httpClient: HttpClient,
        private userService : UserService
    ){}
    private url = "/verificateur/";
    private verificateursSubject = new BehaviorSubject<any[]>([]);
    verificateurs$ = this.verificateursSubject.asObservable();
    loadingVerificators = false;

   // créer un vérificateur
    createVerificateur(verificateurInfo : any) :Observable<any>{
        return this.httpClient.post<any>(`${environment.apiUrl}${this.url}`, verificateurInfo).pipe(tap(res =>{
            const verificateurs = this.verificateursSubject.value;
            verificateurs.push(verificateurInfo);
            this.verificateursSubject.next(verificateurs)
        }))
    }

    //recupérer tous les vérificateurs
    getAllVerificateurs(){
        return this.httpClient.get<any[]>(`${environment.apiUrl}${this.url}`).
        subscribe(response =>{
            this.verificateursSubject.next(response);
            this.loadingVerificators = true;
        })
    }
     
    //recuperer un vérificateur par son ID
    getVerificateurById(id:string):Observable<any>{
        return this.httpClient.get<any>(`${environment.apiUrl}${this.url}${id}`).pipe(tap(res=>{
            this.userService.currentUser = res;
            this.userService.userSubject.next(res);
        }))
    }

    getSingleVerificateur(id:string):Observable<any>{
        if(!this.loadingVerificators){this.getVerificateurById(id)}
        return this.verificateurs$.pipe(
            map(verificateurs => verificateurs.filter(verificateur => verificateur._id == id)[0])
        )
    }

    // modifier les infos d'un vérificateur
    updateInfoVerificateur(id: string, newInfo :any):Observable<any>{
        return this.httpClient.put<any>(`${environment.apiUrl}${this.url}${id}`, newInfo).pipe(tap(res=>{
            const verificateurs = this.verificateursSubject.value;
            const index = verificateurs.findIndex(r => r._id == id);
            verificateurs[index] = newInfo;
            this.verificateursSubject.next(verificateurs);
        }))
    }

    // supprimer un verificateur
    deleteVerificateur(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${environment.apiUrl}${this.url}/${id}`).pipe(tap(res =>{
          const verificateurs = this.verificateursSubject.value;
          const index = verificateurs.findIndex(b => b._id == id)
          verificateurs.splice(index, 1);
          this.verificateursSubject.next(verificateurs);
        }))
      }   
}