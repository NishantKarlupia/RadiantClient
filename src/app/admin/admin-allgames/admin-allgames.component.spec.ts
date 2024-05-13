import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllgamesComponent } from './admin-allgames.component';

describe('AdminAllgamesComponent', () => {
  let component: AdminAllgamesComponent;
  let fixture: ComponentFixture<AdminAllgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllgamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAllgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
