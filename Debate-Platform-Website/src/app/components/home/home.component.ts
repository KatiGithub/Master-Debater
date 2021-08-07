import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Court } from 'src/models/court';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private db: AngularFirestore, private router: Router) {
  }

  clicked = false;

  roomId_formcontrol = new FormControl()

  ngOnInit(): void {
  }

  submitRoomId(roomid: string) {
    let roomId = this.roomId_formcontrol.value;
    let usersref = this.db.collection('courts').doc(roomid).get()
    .subscribe((value) => {
      console.log(value)
      if (value.exists == true) {
        this.router.navigate(['courts/' + roomid])
      }
    })
  }

  createRoom() {
    let court = new Court()
    console.log(court)
    this.db.collection('courts').add(Object.assign({}, court)).
    then((value) => {
      this.router.navigate(['courts/' + value.id])
    })
  }

  clickToEnter() {
    this.clicked = !this.clicked
  }
}
