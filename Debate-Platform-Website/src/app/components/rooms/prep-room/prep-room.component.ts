import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';
import { AspService } from 'src/app/services/asp/asp.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-prep-room',
  templateUrl: './prep-room.component.html',
  styleUrls: ['./prep-room.component.css']
})
export class PrepRoomComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  speakers: string[] = [];
  
  courtId: string = '';
  notesForm!: FormGroup;
  topic: string ='this house will ____';

  modules = {}

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private asp: AspService
  ) { }

  authorized: Boolean = false;

  startTime = new Date()
  minutes_left: number = 0;
  seconds_left: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id;
      this.firestore.checkIfHost(this.courtId).then((value) => {
        this.authorized = value;
      });

      // this.asp.getCourt(this.courtId).

      this.firestore.getStartTime(this.courtId).then((value: Date) => {
        this.startTime = new Date(value['seconds'] * 1000)
        this.firestore.getPrepTime(this.courtId).then((value: number) => {
          console.log(value)
          let timeObservable = new Observable<number>((observer) => {
            let count = 0
            setInterval(() => {
              let timeleft = value - (new Date().getTime() - this.startTime.getTime())/60000
              // console.log(timeleft)
              observer.next(timeleft)
              if (timeleft <= 0) {
                this.firestore.goToNextStage(this.courtId, 1)
                clearInterval()
              }
  
            }, 1000)

            // observer.complete()
          }).subscribe((value) => {
            let seconds = value % 1
            seconds = Math.round(seconds * 60)
            this.minutes_left = value - (value %1)
            this.seconds_left = seconds
          }) 
        })
      })

      this.firestore.checkForChange(this.courtId).subscribe((value) => {
        let current_document = JSON.parse(JSON.stringify(value.payload.data()))
  
        if(current_document['state'] != 1) {
          this.router.navigate(['courts/' + this.courtId])
        }        
      })


    });


    this.notesForm = new FormGroup({
      'notes': new FormControl(null)
    })
  }

}
