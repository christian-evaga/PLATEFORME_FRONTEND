import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponsesRecusComponent } from './reponses-recus.component';

describe('ReponsesRecusComponent', () => {
  let component: ReponsesRecusComponent;
  let fixture: ComponentFixture<ReponsesRecusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReponsesRecusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponsesRecusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
