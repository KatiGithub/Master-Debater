import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { ActivatedRoute, Params } from '@angular/router'
import { FormatConstants } from '../../../constants/format_constants'

interface Format {
  value: string;
  viewValue: string;
}

interface Time {
  value: string;
  viewValue: string;
}

export interface TableInterface {
  name: string;
  position: number;
}

const ELEMENT_DATA: TableInterface[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'},
  {position: 4, name: 'Beryllium'},
  {position: 5, name: 'Boron'}
];

@Component({
  selector: 'app-communal-room',
  templateUrl: './communal-room.component.html',
  styleUrls: ['./communal-room.component.css']
})

export class CommunalRoomComponent implements OnInit {
  
  selectedValue!: string;
  selectedTime!: string;
    
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  authorized: Boolean = false

  constructor(private db: AngularFirestore,
              private route: ActivatedRoute,
              private courtId: Number,
              private data: FormatConstants) {
    this.route.params.subscribe((params: Params) => {
      let courtId = params.court_id;
      db.collection('courts').doc(courtId).get().toPromise().then((value) => {
        let doc = value.data()
        let current_host = JSON.parse(JSON.stringify(doc))['host']

        if(current_host == localStorage.getItem('current_user')!['email']) {
          this.authorized = true
        }
      })
    })
  }
  
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

