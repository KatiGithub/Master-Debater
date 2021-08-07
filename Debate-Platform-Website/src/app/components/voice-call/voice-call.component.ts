import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css'],
})
export class VoiceCallComponent implements OnInit {
  videoActive: boolean = false;
  voiceActive: boolean = false;

  @ViewChild('remote-video') public remote!: ElementRef<HTMLVideoElement>;
  @ViewChild('local-video') public local!: ElementRef<HTMLVideoElement>;

  pc = new RTCPeerConnection();
  localStream: MediaStream = new MediaStream();
  senderId: string = '';

  constructor(private db: AngularFirestore) {
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((value) => {
      this.localStream = value
      this.localStream.getTracks().forEach((track) => {
        this.pc.addTrack(track, this.localStream)
      });

      this.pc.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
          remoteStream.addTrack(track)
        })
      };

      this.remote.nativeElement.srcObject = remoteStream;
      this.local.nativeElement.srcObject = this.localStream;
    })

    let remoteStream = new MediaStream()
  }

  ngOnInit() {
    
  }

  createOffer() {
    this.pc.onicecandidate = event => {
      // event.candidate && 
    }

    this.pc.createOffer().then((value)=> {
      this.pc.setLocalDescription(value)
      let offer = {
        sdp: value.sdp,
        type: value.type
      }
    });
  }

}
