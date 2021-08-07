import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunalRoomComponent } from './communal-room.component';

describe('CommunalRoomComponent', () => {
  let component: CommunalRoomComponent;
  let fixture: ComponentFixture<CommunalRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunalRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunalRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
