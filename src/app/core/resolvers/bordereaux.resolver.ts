import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {BordereauxService} from "../services/bordereaux.service"


// @Injectable()
// export class ComiteResolver implements Resolve<any[]>{
//     constructor(private bordereauService : BordereauxService ){}
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any[]>{
//         return this.bordereauService.getAllBordereaux();
//     }
// }