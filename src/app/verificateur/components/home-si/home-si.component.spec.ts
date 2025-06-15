import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSiComponent } from './home-si.component';

describe('HomeSiComponent', () => {
  let component: HomeSiComponent;
  let fixture: ComponentFixture<HomeSiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
