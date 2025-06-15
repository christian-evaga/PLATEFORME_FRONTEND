import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environment/environment.test';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequeteService {
  private url = '/requete/';
  allRequete!:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Récupérer tous les requete
  async getAllRequete(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}${this.url}`))
    .then((res)=>this.allRequete = res);
  }

  // Récupérer tous les requete
  async getAllRequeteByPriority(priority: any): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}${this.url}getByPriority/${priority}`));
  }

  // Récupérer tous les requetes 
  async getAllRequeteByStatut(statut: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}${this.url}getByStatut/${statut}`));
  }

  // Récupérer un requete par ID
  getRequeteById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.url}${id}`);
  }

  // Récupérer un requete par ID
  getAnswerByBordereau(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.url}getAllAnswersByBordereau/${id}`);
  }

  // Créer un nouveau requete
  createRequete(requete: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${this.url}create/`, requete);
  }

  // Mettre à jour un requete existant
  updateRequete(id: string, requete: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${this.url}/${id}`, requete);
  }

  // Supprimer un requete
  deleteRequete(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}${this.url}/${id}`);
  }
}