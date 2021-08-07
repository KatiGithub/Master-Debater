import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRedirectComponent } from './room-redirect.component';

describe('RoomRedirectComponent', () => {
  let component: RoomRedirectComponent;
  let fixture: ComponentFixture<RoomRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
