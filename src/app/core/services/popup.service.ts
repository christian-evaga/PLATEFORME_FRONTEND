import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class PopupService{
    private subject = new Subject<{message : string; typePopup : string}>();

    showPopup(message : string, typePopup : string ="warning") : void {
        this.subject.next({message, typePopup});
    }

    getObservable(): Subject<{message : string; typePopup : string}>{
        return this.subject;
    }
}