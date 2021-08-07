import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from '../../../services/Firestore/firestore.service';
import { FormatConstants } from '../../../constants/format_constants';


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
  styleUrls: ['./communal-room.component.css'],
})
export class CommunalRoomComponent implements OnInit {
  courtId: string = ''
  
  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id;
      firestore.checkIfHost(this.courtId).then((value) => {
        this.authorized = value;
      });
    });
  }

  selectedValue!: string;
  selectedTime!: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  authorized: Boolean = false;

  ngOnInit(): void {}

  formats: Format[] = [
    { value: '1', viewValue: 'Asian Parliament' },
    { value: '2', viewValue: 'British' },
    { value: '3', viewValue: '' },
  ];

  times: Time[] = [
    { value: '1', viewValue: '15 minutes' },
    { value: '2', viewValue: '30 minutes' },
    { value: '3', viewValue: '45 minutes' },
    { value: '4', viewValue: '60 minutes' },
  ];
}
