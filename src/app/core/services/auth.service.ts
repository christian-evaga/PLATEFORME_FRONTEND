import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../../environment/environment.test";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { VerificateurService } from "./verificateur.service";


@Injectable({
    providedIn : 'root'
})

export class AuthService{
    constructor(
        private httpClient: HttpClient,
        private router:Router,
        private userService : UserService,
        private verificateurService : VerificateurService
    ){}
    private url="/auth";
    isConnected = false;
    private userSubject = new BehaviorSubject<any[]>([]);
    users$ = this.userSubject.asObservable();
    users!: any[];
    userId!:string;
    token!:string;
    typeUser!:string;
    codeVerificateur ="verificateurcicc2025"

    login(email:string, password:string):Observable<any> {
        // console.log(email);
        return this.httpClient.post(`${environment.apiUrl}${this.url}/login`, {email, password})
                .pipe(
                    tap((response:any)=>{
                        this.userId = response.userId;
                        this.token = response.token;
                        this.isConnected = true;
                        this.saveUserInfo(response.token, response.userId, "exportateur");
                        this.userService.getUserById(response.userId).subscribe(
                            (res)=>{
                                this.userService.currentUser = res;
                                this.typeUser = "exportateur";
                                if(this.userService.currentUser.role == 'admin'){this.router.navigateByUrl("/gestion/admin")}
                                else if(this.userService.currentUser.role == 'system'){this.router.navigateByUrl("/verificateur/list-requete")}
                                else{this.router.navigateByUrl("/gestion")}
                                // console.log(this.userService.currentUser);
                              }
                        );
                    }))
    }
    loginVerificateur(email:string, password:string):Observable<any> {
        // console.log(email);
        return this.httpClient.post(`${environment.apiUrl}${this.url}/loginVerificateur`, {email, password})
                .pipe(
                    tap((response:any)=>{
                        this.userId = response.verificateurId;
                        this.token = response.token;
                        this.isConnected = true;
                        this.saveUserInfo(response.token, response.verificateurId, "verificateur");
                        this.verificateurService.getVerificateurById(response.verificateurId).subscribe(
                            (res)=>{
                                this.userService.currentUser = res;
                                // console.log(this.userService.currentUser);
                              }
                        );
                        this.typeUser = "verificateur";
                        this.router.navigateByUrl("/verificateur")
                    }))
    }

    saveUserInfo(token:string, id:string, type:string){
        localStorage.setItem('token',token);
        localStorage.setItem('userId', id);
        localStorage.setItem('typeUser', type);
    }

    signUp(userInfo:any):Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}${this.url}/signup`, userInfo).pipe(tap(res =>{
            let users =[];
            this.userService.users$.subscribe(data =>users = data);
            users.push(userInfo);
            this.userSubject.next(users);
        }))
    }
    verifyOtp(otp:string, email:string):Observable<any>{
        return this.httpClient.post(`${environment.apiUrl}${this.url}/verifyOtp`, {otp, email}).pipe(tap(()=>{
        }));
    }
    public autoConnect(){
        const userId = localStorage.getItem('userId') ?? '';
        const token = localStorage.getItem("token") ?? '';
        const typeUser = localStorage.getItem("typeUser") ?? '';
        if(userId && token){
            this.isConnected = true;
            this.userId = userId;
            this.token = token;
            this.typeUser = typeUser;
        }
        else{
            this.isConnected = false;
        }
    }
    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("typeUser");
        this.token = "";  
        this.userId = "";
        this.isConnected = false;
        this.router.navigateByUrl(""); 
    }
}