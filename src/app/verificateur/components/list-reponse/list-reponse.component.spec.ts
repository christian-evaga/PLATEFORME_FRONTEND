import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReponseComponent } from './list-reponse.component';

describe('ListReponseComponent', () => {
  let component: ListReponseComponent;
  let fixture: ComponentFixture<ListReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
