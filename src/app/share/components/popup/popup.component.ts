import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, ElementRef, ViewChild, OnInit } from '@angular/core';
import { PopupService } from '../../../core/services/popup.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'] // ✅ attention : `styleUrls` au pluriel
})
export class PopupComponent implements AfterViewInit, OnChanges, OnInit {
  // @Input() typePopup!: string;
  // @Input() message!: string;
  // @Input() display!: boolean;
  display = false;
  message="";
  typePopup ="";
  constructor(private popupService : PopupService){
    this.popupService.getObservable().subscribe((data)=>{
      this.display = true;
      this.message = data.message;
      this.typePopup = data.typePopup;
    })
  }
  fermer(){
    this.display = false;
  }
  // @ViewChild('popupRef') popupRef!: ElementRef;

  ngOnInit(): void {
    // this.applyStyle();
  }

  ngAfterViewInit(): void {
    // this.applyStyle();
  }

  ngOnChanges(): void {
    // this.applyStyle();
  }

  // applyStyle() {
  //   if (!this.popupRef) return;

  //   const element = this.popupRef.nativeElement as HTMLElement;
  //   // element.classList.remove('warning', 'error', 'success');

  //   if(this.display == true){
  //     element.classList.add('view');
  //     element.classList.remove('none')
  //     if (this.typePopup === 'warning') {
  //       element.classList.add('warning');
  //     } else if (this.typePopup === 'error') {
  //       element.classList.add('error');
  //     } else {
  //       element.classList.add('success');
  //     }
  //   }else{
  //     element.classList.remove('view');
  //     element.classList.add('none')
  //   }
  // }

  // close() {
  //   const element = this.popupRef.nativeElement as HTMLElement;
  //   element.classList.remove('warning', 'error', 'success', 'view');
  //   element.classList.add('none')
  // }
}
