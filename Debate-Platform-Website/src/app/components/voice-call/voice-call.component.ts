import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { CallService } from 'src/app/services/CallService/call.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css'],
})
export class VoiceCallComponent implements OnInit, OnDestroy, OnChanges {
  public isCallStarted$: Observable<Boolean>;
  private peerId: string;

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  @Input('host') hostBool!: Boolean;
  @Input('courtId') courtId: string = '';

  constructor(private db: AngularFirestore, private callService: CallService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.peerId = this.callService.initPeer();
  }

  ngOnInit() {
    this.callService.localStream$
      .pipe(filter((res) => !!res))
      .subscribe(
        (stream) => (this.localVideo.nativeElement.srcObject = stream)
      );

    this.callService.remoteStream$
      .pipe(filter((res) => !!res))
      .subscribe(
        (stream) => (this.remoteVideo.nativeElement.srcObject = stream)
      );

    if (this.hostBool) {
      this.startCall();
    } else if(this.hostBool == false) {
      this.joinCall();
    }
  }

  ngOnChanges() {}

  ngOnDestroy() {
    this.callService.destroyPeer();
  }

  public startCall() {
    this.db
      .collection('courts')
      .doc(this.courtId)
      .get()
      .toPromise()
      .then((value) => {
        let current_data = JSON.parse(JSON.stringify(value.data()));
        let host = current_data['host'];
        host['webrtc_token'] = this.peerId;

        this.db
          .collection('courts')
          .doc(this.courtId)
          .update({ host: host })
          .then();
        console.log(this.peerId);

        this.callService.enableCallAnswer();
        console.log(host)
      });
  }

  joinCall() {
    this.db
      .collection('courts')
      .doc(this.courtId)
      .get()
      .toPromise()
      .then((value) => {
        let current_value = JSON.parse(JSON.stringify(value.data()));
        let hosts_peerid = current_value['host']['webrtc_token'];
        console.log(hosts_peerid);
        this.callService.establishMediaCall(hosts_peerid);
      });
  }

  public endCall() {
    this.callService.closeMediaCall();
  }
}
