import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCodesComponent } from './user-codes.component';

describe('UserCodesComponent', () => {
  let component: UserCodesComponent;
  let fixture: ComponentFixture<UserCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
