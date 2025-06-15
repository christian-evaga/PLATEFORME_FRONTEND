import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoVerificateurComponent } from './histo-verificateur.component';

describe('HistoVerificateurComponent', () => {
  let component: HistoVerificateurComponent;
  let fixture: ComponentFixture<HistoVerificateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoVerificateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoVerificateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
