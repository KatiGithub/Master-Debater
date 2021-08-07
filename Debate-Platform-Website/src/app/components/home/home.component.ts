import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
<<<<<<< HEAD
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
=======
>>>>>>> a6a8f0ee13cf977c82321b188f1e86593a88633c
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

<<<<<<< HEAD
  constructor(private db: AngularFirestore, private router: Router) {
    this.submitRoomId(5)
  }
=======
  constructor(
    private router: Router
  ) { }
>>>>>>> a6a8f0ee13cf977c82321b188f1e86593a88633c

  roomId_formcontrol = new FormControl()

  ngOnInit(): void {
  }

<<<<<<< HEAD
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
=======
  toLogIn(){
    this.router.navigate(['login']);
  }


>>>>>>> a6a8f0ee13cf977c82321b188f1e86593a88633c
}
