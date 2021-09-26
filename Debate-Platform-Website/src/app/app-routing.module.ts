import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunalRoomComponent } from './components/rooms/communal-room/communal-room.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoomRedirectComponent } from './components/rooms/room-redirect/room-redirect.component';
import { PrepRoomComponent } from './components/rooms/prep-room/prep-room.component';
import { DebateRoomComponent } from './components/rooms/debate-room/debate-room.component';
import { JudgeComponent } from './components/rooms/judge/judge.component';
import { VoiceCallComponent } from './components/voice-call/voice-call.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuardService],
  },

  {
    path: 'courts/:court_id',
    component: RoomRedirectComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'communal_room/:court_id',
    component: CommunalRoomComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'prep_room/:court_id',
    component: PrepRoomComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'debate_room',
    component: DebateRoomComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'debate_room/:court_id',
    component: DebateRoomComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'judge_room/:court_id',
    component: JudgeComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'vc_test',
    component: VoiceCallComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
