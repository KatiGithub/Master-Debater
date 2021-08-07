import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepRoomComponent } from './prep-room.component';

describe('PrepRoomComponent', () => {
  let component: PrepRoomComponent;
  let fixture: ComponentFixture<PrepRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
