import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBordereauComponent } from './add-bordereau.component';

describe('AddBordereauComponent', () => {
  let component: AddBordereauComponent;
  let fixture: ComponentFixture<AddBordereauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBordereauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
