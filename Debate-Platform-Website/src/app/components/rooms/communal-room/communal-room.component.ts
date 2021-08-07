import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Format {
  value: string;
  viewValue: string;
}

interface Time {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079},
  {position: 2, name: 'Helium', weight: 4.0026},
  {position: 3, name: 'Lithium', weight: 6.941},
  {position: 4, name: 'Beryllium', weight: 9.0122},
  {position: 5, name: 'Boron', weight: 10.811}
];

@Component({
  selector: 'app-communal-room',
  templateUrl: './communal-room.component.html',
  styleUrls: ['./communal-room.component.css']
})

export class CommunalRoomComponent implements OnInit {

  constructor(private db: AngularFirestore){}
  
  selectedValue!: string;
  selectedTime!: string;
    
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  ngOnInit(): void {
  }

  formats: Format[] = [
    {value: '1', viewValue: 'Asian Parliament'},
    {value: '2', viewValue: 'British'},
    {value: '3', viewValue: ''}
  ];

  times: Time[] = [
    {value: '1', viewValue: '15 minutes'},
    {value: '2', viewValue: '30 minutes'},
    {value: '3', viewValue: '45 minutes'},
    {value: '4', viewValue: '60 minutes'}
  ];
}

