import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateRoomComponent } from './debate-room.component';

describe('DebateRoomComponent', () => {
  let component: DebateRoomComponent;
  let fixture: ComponentFixture<DebateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebateRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
