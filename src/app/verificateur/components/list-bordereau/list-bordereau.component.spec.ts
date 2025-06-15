import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBordereauComponent } from './list-bordereau.component';

describe('ListBordereauComponent', () => {
  let component: ListBordereauComponent;
  let fixture: ComponentFixture<ListBordereauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBordereauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
