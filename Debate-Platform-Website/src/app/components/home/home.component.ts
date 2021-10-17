import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Court } from 'src/models/court';
import { CallService } from 'src/app/services/CallService/call.service';
import { AspService } from 'src/app/services/asp/asp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private AspService: AspService
  ) {}

  clicked = false;

  roomId_formcontrol = new FormControl();

  ngOnInit(): void {}

  submitRoomId() {
    let roomId = this.roomId_formcontrol.value;
    // this.db.collection('courts').doc(roomId).get()
    // .subscribe((value) => {
    //   console.log(value)
    //   if (value.exists == true) {
    //     this.router.navigate(['courts/' + roomId])
    //   }
    // })

    this.AspService.joinCourt(roomId)
      .toPromise()
      .then(() => {
        this.router.navigate(['courts/' + roomId]);
      }).catch(() => {
        // Implement error here
        console.log("Invalid token");
      });
  }

  createRoom() {
    let court = new Court();
    console.log(court);

    this.AspService.createCourt()
      .toPromise()
      .then((value)=>{
        console.log("court token:")
        console.log(value);
        
        localStorage.setItem('courttoken', JSON.parse(JSON.stringify(value)));
        
        this.router.navigate(['courts/' + value]);
        // this.AspService.getCourt(JSON.stringify(value))
        // .toPromise()
        // .then((values)=>{
        //   console.log(values);
        //   let result = JSON.parse(JSON.stringify(values))
        //   console.log(result.courtid.toString());
        // })
        // .catch((err)=>{
        //   console.log(err)
        // })
      })
      .catch((err)=>
      {
        console.log(err); 
      })

      // this.db
      //   .collection('courts')
      //   .add(Object.assign({}, court))
      //   //ngong
      //   .then((value) => {
      //     console.log("returned from angularfirebase db: ")
      //     console.log(value)
      //     this.router.navigate(['courts/' + value.id]);
      //   });
  }
    
}
