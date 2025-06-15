import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRequeteComponent } from './modal-requete.component';

describe('ModalRequeteComponent', () => {
  let component: ModalRequeteComponent;
  let fixture: ComponentFixture<ModalRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRequeteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
