import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRedeemComponent } from './user-redeem.component';

describe('UserRedeemComponent', () => {
  let component: UserRedeemComponent;
  let fixture: ComponentFixture<UserRedeemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRedeemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
