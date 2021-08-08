import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private peer!: Peer;
  private mediaCall!: Peer.MediaConnection;

  private localStreamBs: BehaviorSubject<MediaStream> =
    new BehaviorSubject<any>(null);
  public localStream$ = this.localStreamBs.asObservable();

  private remoteStreamBs: BehaviorSubject<MediaStream> =
    new BehaviorSubject<any>(null);
  public remoteStream$ = this.remoteStreamBs.asObservable();

  private isCallStartedBs = new Subject<Boolean>();
  public isCallStarted$ = this.isCallStartedBs.asObservable();

  constructor() {}

  public initPeer() {
    let id: string = ''
    if (!this.peer || this.peer.disconnected) {
      const peerJsOptions: Peer.PeerJSOption = {
        debug: 3,
        config: {
          iceServers: [
            {
              urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
              ],
            },
          ],
        },
      };

      try {
        id = uuidv4();
        console.log(id)
        this.peer = new Peer(id, peerJsOptions);
      } catch(error) {
        console.error(error)
      }
    }
    return id;
  }

  public async establishMediaCall(peerId: string){
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true});
      console.log("Connecting to: " + peerId)

      const connection = this.peer.connect(peerId);
      connection.on('error', err => {
        console.error(err);
        return;
      })

      this.mediaCall = this.peer.call(peerId, stream);
      if(!this.mediaCall) {
        let errorMessage = "Unable to connect to host";
        throw new Error(errorMessage);
      }

      console.log(stream)
      this.localStreamBs.next(stream);
      this.isCallStartedBs.next(true);

      this.mediaCall.on('stream', (remoteStream) => {
        this.remoteStreamBs.next(remoteStream);
      });

      this.mediaCall.on('error', (err) => {
        console.error(err);
        this.isCallStartedBs.next(false)
      });

      this.mediaCall.on('close', () => {
        this.onCallClose();
      })
    } catch (err) {
      console.error(err);
      this.isCallStartedBs.next(false);
    }
  }

  public async enableCallAnswer() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
      this.localStreamBs.next(stream);
      this.peer.on('call', async (call) => {
        this.mediaCall = call;
        this.isCallStartedBs.next(true);

        this.mediaCall.answer(stream);
        this.mediaCall.on('stream', (remoteStream) => {
          this.remoteStreamBs.next(remoteStream)
        });

        this.mediaCall.on('error', err => {
          console.error(err);
          this.isCallStartedBs.next(false);
        })
      })
    } catch(err) {
      console.error(err)
      this.isCallStartedBs.next(false)
    }
  }

  private onCallClose() {
    this.remoteStreamBs?.value.getTracks().forEach(tracks => {
      tracks.stop();
    });

    this.localStreamBs?.value.getTracks().forEach(tracks => {
      tracks.stop();
    })
  }

  public destroyPeer() {
    this.mediaCall?.close();
    this.peer?.disconnect();
    this.peer?.destroy();
  }

  public closeMediaCall() {
    this.mediaCall?.close();
    if(!this.mediaCall) {
      this.onCallClose();
    }
  }
}
