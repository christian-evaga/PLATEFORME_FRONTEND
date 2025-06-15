import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBordereauComponent } from './detail-bordereau.component';

describe('DetailBordereauComponent', () => {
  let component: DetailBordereauComponent;
  let fixture: ComponentFixture<DetailBordereauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBordereauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
