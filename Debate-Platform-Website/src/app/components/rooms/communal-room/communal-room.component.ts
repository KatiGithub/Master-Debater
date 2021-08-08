import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirestoreService } from '../../../services/Firestore/firestore.service';
import { FormatConstants } from '../../../constants/format_constants';
import { FormControl } from '@angular/forms';
import { validateEventsArray } from '@angular/fire/firestore';

class Format {
  constructor(public value: string) {}
}

interface Time {
  value: number;
  viewValue: string;
}

class FormatPos {
  constructor(public pos: string, public team_member?: string) {}
}

interface FormatPos {
  pos: string
}

@Component({
  selector: 'app-communal-room',
  templateUrl: './communal-room.component.html',
  styleUrls: ['./communal-room.component.css'],
})
export class CommunalRoomComponent implements OnInit {
  courtId: string = ''
  preptime = new FormControl('auto')
  format_control = new FormControl()
  topic_control = new FormControl()
  debate_link: string = ''
  public POSITION_DATA: FormatPos[] = [];
  public OPPOSITION_DATA: FormatPos[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id;
      this.debate_link = location.origin + "/" + this.courtId
      firestore.checkIfHost(this.courtId).then((value) => {
        this.authorized = value;
      });
    });

    this.firestore.checkForChange(this.courtId).subscribe((value) => {
      let current_document = JSON.parse(JSON.stringify(value.payload.data()))

      console.log(current_document)

      if(current_document['state'] != 0) {
        this.router.navigate(['courts/' + this.courtId])
      }

      this.firestore.getCurrentTeams(this.courtId).then((value) => {
        console.log(value)
        for(let x in this.Team1) {
          this.Team1[x].team_member = value['team1'][x]
          this.Team2[x].team_member = value['team2'][x]
        }
      })
    })
  
    this.preptime.valueChanges.subscribe((value: number) => {
      console.log(value)
      firestore.updatePrepTime(this.courtId, value)
    });

    this.format_control.valueChanges.subscribe((value: string) => {
      console.log(value);
      firestore.updateDebateFormat(this.courtId, value);

      console.log(FormatConstants.formats[value]['positions'])
      
      this.POSITION_DATA = []
      this.OPPOSITION_DATA = []
      for (let pos in FormatConstants.formats[value]['positions']) {
        this.POSITION_DATA.push({'pos': FormatConstants.formats[value]['positions'][pos]});
      }
      for (let opp in FormatConstants.formats[value]['positionsOpp']) {
        this.OPPOSITION_DATA.push({'pos': FormatConstants.formats[value]['positionsOpp'][opp]});
      }
      
      console.log(this.POSITION_DATA);
      console.log(this.OPPOSITION_DATA);
      this.Team1 = this.POSITION_DATA;
      this.Team2 = this.OPPOSITION_DATA;
    });


  }

  displayedColumns: string[] = ['PositionName', 'SelectionColumn'];
  Team1: any[] = [];
  Team2: any[] = [];
  
  authorized: Boolean = false;
  
  ngOnInit(): void {
    for (let x in FormatConstants.formats) {
      this.formats.push(new Format(x))
    }

    this.firestore.getCurrentTeams(this.courtId).then((value: Object) => {
      console.log(value)
      for(let x in this.Team1) {
        this.Team1[x].team_member = value['team1'][x]
        this.Team2[x].team_member = value['team2'][x]
      }
    })

    // this.firestore.getFormat(this.courtId).then((value: string) => {
    //   this.format_control.setValue(value)
    // })
  }
  
  formats: Format[] =[];
  
  joinTeam(team_number: number) {
    this.firestore.joinTeam(this.courtId, team_number)
  }

  times: Time[] = [
    { value: 15, viewValue: '15 minutes' },
    { value: 30, viewValue: '30 minutes' },
    { value: 45, viewValue: '45 minutes' },
    { value: 60, viewValue: '60 minutes' },
  ];

  selectPosition() {
    console.log('position selected');
  }

  start() {
    this.firestore.updateTopic(this.courtId, this.topic_control.value)
    this.firestore.goToNextStage(this.courtId, 0)
  }
}
