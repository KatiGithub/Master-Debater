import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Component({
  selector: 'app-prep-room',
  templateUrl: './prep-room.component.html',
  styleUrls: ['./prep-room.component.css']
})
export class PrepRoomComponent implements OnInit {

  courtId: string = '';
  notesForm!: FormGroup;

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  authorized: Boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id;
      this.firestore.checkIfHost(this.courtId).then((value) => {
        this.authorized = value;
      });

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
