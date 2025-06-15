import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.test';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BordereauxService {
  private url = '/bordereau/';
  allBordereauxUser!: any[];
  private bordereauxSubject = new BehaviorSubject<any[]>([]);
  bordereaux$ = this.bordereauxSubject.asObservable();
  loadedBorderaux = false;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Récupérer tous les bordereaux
  async getAllBordereaux() {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}${this.url}`))
    .then((res)=>{
      this.allBordereauxUser = res;
      this.bordereauxSubject.next(res);
      this.loadedBorderaux = true;
    });
  }

  // Récupérer tous les bordereaux
  async getAllBordereauxOfUser() {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}${this.url}/user/${this.authService.userId}`))
    .then((res)=>{
      this.allBordereauxUser = res;
      this.bordereauxSubject.next(res);
      this.loadedBorderaux = true;
    });
  }

  // Récupérer tous les bordereaux
  async getAllBordereauxByStatut(statut: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}${this.url}getByStatut/${statut}`));
  }

  // Récupérer tous les bordereaux
  async getAllBordereauxByVerificateur(statut: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}${this.url}verificateur/${statut}`));
  }

  // Récupérer un bordereau par ID
  getBordereauById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.url}${id}`);
  }

  getSingleBordereau(id:number) :Observable<any>{
    if(!this.loadedBorderaux){this.getAllBordereaux()}
    return this.bordereaux$.pipe(
      map(bordereaux => bordereaux.filter(bordereau => bordereau._id == id)[0])
    )
  }

  // Créer un nouveau bordereau
  createBordereau(bordereau: any): Observable<any> {
    bordereau.statut = "send"
    return this.http.post<any>(`${environment.apiUrl}${this.url}`, bordereau).pipe(tap(res =>{
      const bordereaux = this.bordereauxSubject.value;
      bordereaux.push(bordereau);
      this.bordereauxSubject.next(bordereaux);
    }));
  }

  // Mettre à jour un bordereau existant
  updateBordereau(id: string, bordereau: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${this.url}${id}`, bordereau).pipe(tap(res =>{
      const bordereaux = this.bordereauxSubject.value;
      const index = bordereaux.findIndex(b => b._id == id);
      bordereaux[index] = bordereau;
      this.bordereauxSubject.next(bordereaux);
    }))
  }

  // Supprimer un bordereau
  deleteBordereau(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}${this.url}/${id}`).pipe(tap(res =>{
      const bordereaux = this.bordereauxSubject.value;
      const index = bordereaux.findIndex(b => b._id == id)
      bordereaux.splice(index, 1);
      this.bordereauxSubject.next(bordereaux);
    }))
  }
}