import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { environment } from "../../../environment/environment.test";

@Injectable({
    providedIn : 'root'
})

export class UserService{
    constructor(
        private httpClient: HttpClient
    ){}
    private url="/users/";
    currentUser!:any
    private singleUserSubject = new BehaviorSubject<any | null>(null);
    user$ = this.singleUserSubject.asObservable();
    haveUser = false;
    public userSubject = new BehaviorSubject<any[]>([]);
    users$ = this.userSubject.asObservable();
    users!: any[];
    loadingUser = false;

    //récupérer tous les utilisateurs
    getAllUsers(){
        return this.httpClient.get<any>(`${environment.apiUrl}${this.url}`).subscribe(res =>{
            this.loadingUser = true;
            this.users = res;
            this.userSubject.next(res);
        })
    }
    
    //récupérer un utilisateur par son id
    getUserById(id:string):Observable<any>{
        return this.httpClient.get<any>(`${environment.apiUrl}${this.url}${id}`).pipe(
            tap(res =>{
                this.currentUser = res;
                this.singleUserSubject.next(res);
            })
        )
    }

    getSingleUser(id:string):Observable<any>{
        if(!this.loadingUser){this.getUserById(id)}
        return this.users$.pipe(
            map(users => users.filter(user => user._id == id)[0])
        )
    }

    //modifier les informations d'un user
     updateUser(id:string, newInfo:any):Observable<any>{
        return this.httpClient.put<any>(`${environment.apiUrl}${this.url}${id}`, newInfo).pipe(
            tap(res =>{
                const users = this.userSubject.value;
                const index = users.findIndex(u => u._id == id);
                users[index] = newInfo;
                this.singleUserSubject.next(users[index]);
                this.userSubject.next(users);
            })
        )
     }
    
    // supprimer un user
    deleteUser(id:BigIntToLocaleStringOptions):Observable<any>{
        return this.httpClient.delete<any>(`${environment.apiUrl}${this.url}${id}`).pipe(
            tap(res =>{
                const users = this.userSubject.value;
                const index = users.findIndex(u => u._id == id);
                users.splice(index, 1);
                this.userSubject.next(users);
            })
        )
     }
}