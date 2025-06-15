import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequeteComponent } from './list-requete.component';

describe('ListRequeteComponent', () => {
  let component: ListRequeteComponent;
  let fixture: ComponentFixture<ListRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRequeteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
