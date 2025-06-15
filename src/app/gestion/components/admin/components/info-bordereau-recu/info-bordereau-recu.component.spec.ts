import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBordereauRecuComponent } from './info-bordereau-recu.component';

describe('InfoBordereauRecuComponent', () => {
  let component: InfoBordereauRecuComponent;
  let fixture: ComponentFixture<InfoBordereauRecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBordereauRecuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBordereauRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
