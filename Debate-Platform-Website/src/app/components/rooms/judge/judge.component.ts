import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormatConstants } from 'src/app/constants/format_constants';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {

  courtId: string = '';
  judgenotes!: FormGroup;
  team1parts: string[] = [];
  team2parts: string[] = [];

  modules = {}

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
    this.judgenotes = new FormGroup({
      judgeNotes: new FormControl()
    })

    this.firestore.getFormat(this.courtId).then((value) =>{
      let posit = value;
      console.log(posit)
      this.team1parts = FormatConstants.formats[posit].positions;
      this.team2parts = FormatConstants.formats[posit].positionsOpp;
      console.log(this.team1parts);
      console.log(this.team2parts);
    })
  }
  

}
