import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificateurComponent } from './verificateur.component';

describe('VerificateurComponent', () => {
  let component: VerificateurComponent;
  let fixture: ComponentFixture<VerificateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
