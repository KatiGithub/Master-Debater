import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Court } from 'src/models/court';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-debate-room',
  templateUrl: './debate-room.component.html',
  styleUrls: ['./debate-room.component.css']
})
export class DebateRoomComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  DebateForm!: FormGroup;
  topic: string = '';
 


  module ={}
  constructor( public court: Court) { }

  ngOnInit(): void {
    this.court = new Court;
    
  }

  getNextSpeaker(): void {
    
  }

}
