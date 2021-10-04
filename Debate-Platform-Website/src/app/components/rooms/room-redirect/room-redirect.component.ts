import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AspService } from 'src/app/services/asp/asp.service';

@Component({
  selector: 'app-room-redirect',
  templateUrl: './room-redirect.component.html',
  styleUrls: ['./room-redirect.component.css'],
})
export class RoomRedirectComponent implements OnInit {
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private AspService: AspService
  ) {}

  courtId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id;
      // this.db.collection('courts').doc(this.courtId)
      //   .get().toPromise().then((value) => {
      //     let returned_state = value.data()
      //     let current_state = JSON.parse(JSON.stringify(returned_state))['state']

      //     if(current_state == 0) {
      //       this.router.navigate(['communal_room/' + this.courtId])
      //     } else if(current_state == 1) {
      //       this.router.navigate(['prep_room/' + this.courtId])
      //     } else if(current_state == 2) {
      //       this.router.navigate(['debate_room/' + this.courtId])
      //     } else if(current_state == 3) {
      //       this.router.navigate(['judge_room/' + this.courtId])
      //     } else if(current_state == 4) {
      //       this.router.navigate(['communal_room/' + this.courtId])
      //     }
      //   })

      this.AspService.getCourt(this.courtId)
        .toPromise()
        .then((value) => {
          
          let current_state = value['current_state'];

          if (current_state == 0) {
            this.router.navigate(['communal_room/' + this.courtId]);
          } else if (current_state == 1) {
            this.router.navigate(['prep_room/' + this.courtId]);
          } else if (current_state == 2) {
            this.router.navigate(['debate_room/' + this.courtId]);
          } else if (current_state == 3) {
            this.router.navigate(['judge_room/' + this.courtId]);
          } else if (current_state == 4) {
            this.router.navigate(['communal_room/' + this.courtId]);
          }
        });
    });
  }
}
