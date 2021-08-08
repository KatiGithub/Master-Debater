import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {

  courtId: string = ''

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id

      this.firestore.checkForChange(this.courtId).subscribe((value) => {
        let current_value = JSON.parse(JSON.stringify(value.payload.data()))

        if(current_value['state'] != 2) {
          this.router.navigate(['courts/' + this.courtId]);
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
