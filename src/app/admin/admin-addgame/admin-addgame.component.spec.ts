import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddgameComponent } from './admin-addgame.component';

describe('AdminAddgameComponent', () => {
  let component: AdminAddgameComponent;
  let fixture: ComponentFixture<AdminAddgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddgameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
