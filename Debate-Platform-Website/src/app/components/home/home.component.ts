import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private db: AngularFirestore, private router: Router) {
    this.submitRoomId(5)
  }

  roomId_formcontrol = new FormControl()

  ngOnInit(): void {
  }

  submitRoomId(roomid: Number) {
    let roomId = this.roomId_formcontrol.value;
    let usersRef = this.db.collection('rooms', ref => ref.where('roomid', "==", roomid))
    .valueChanges().subscribe((value: Array<any>) => {
      console.log(value)
      if(value.length == 1) {
        this.router.navigate([String(roomId)])
      }
    })
  }
  toLogIn(){
    this.router.navigate(['communal']);
  }

  createRoom() {
    this.db.collection('rooms').add({
      
    })
  }
}
