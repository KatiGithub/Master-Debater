import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-room-redirect',
  templateUrl: './room-redirect.component.html',
  styleUrls: ['./room-redirect.component.css']
})
export class RoomRedirectComponent implements OnInit {

  constructor(private router: Router,
              private db: AngularFirestore,
              private route: ActivatedRoute) { }

  courtId: string = ''

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id
      this.db.collection('courts').doc(this.courtId)
        .get().subscribe((value) => {
          if (value) {
            
          }
        })


    })
    
  }

}
