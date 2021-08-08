import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-debate-room',
  templateUrl: './debate-room.component.html',
  styleUrls: ['./debate-room.component.css']
})
export class DebateRoomComponent implements OnInit {

  DebateForm!: FormGroup;
  topic: string = '';

  module ={}
  constructor() { }

  ngOnInit(): void {
    
  }

}
