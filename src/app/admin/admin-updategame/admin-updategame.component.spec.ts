import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdategameComponent } from './admin-updategame.component';

describe('AdminUpdategameComponent', () => {
  let component: AdminUpdategameComponent;
  let fixture: ComponentFixture<AdminUpdategameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUpdategameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUpdategameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
