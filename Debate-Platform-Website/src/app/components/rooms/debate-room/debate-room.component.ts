import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Court } from 'src/models/court';
import { ActivatedRoute, Params, Router } from '@angular/router';


export interface SpeakerProperties {
  team: string;
  name: string;
  position: number;
  status: string;
}

@Component({
  selector: 'app-debate-room',
  templateUrl: './debate-room.component.html',
  styleUrls: ['./debate-room.component.css']
})
export class DebateRoomComponent implements OnInit {

  topic: string = '';
  notesForm!: FormGroup;
  SpeakerTable: SpeakerProperties[] = [
    {
      team: "1", name: "he", position: 3, status: "d"
    },
    {
      team: "6", name: "zhe", position: 6, status: "o"
    }
  ];

  displayedColumns: string[] = ['teams', 'names', 'positions', 'statuses'];
  modules = {};
  courtId: string = '';

  constructor( public court: Court,
               private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.court = new Court;
    
    this.notesForm = new FormGroup({
      'notes': new FormControl(null)
    })
    
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id;
    });
    



  }

  getNextSpeaker(): void {
    
  }
  
  

}
