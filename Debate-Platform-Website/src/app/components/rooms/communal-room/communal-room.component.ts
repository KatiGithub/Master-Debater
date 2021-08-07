import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from '../../../services/Firestore/firestore.service';
import { FormatConstants } from '../../../constants/format_constants';
import { FormControl } from '@angular/forms';

class Format {
  constructor(public value: string) {}
}

interface Time {
  value: number;
  viewValue: string;
}

export interface TableInterface {
  name: string;
  position: number;
}

const POSITION_DATA: TableInterface[] = [
  {position: 1 , name: 'Hydrogen'},
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
  preptime = new FormControl('auto')
  format_control = new FormControl()

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

    this.preptime.valueChanges.subscribe((value: number) => {
      console.log(value)
      firestore.updatePrepTime(this.courtId, value)
    })

    this.format_control.valueChanges.subscribe((value: string) => {
      console.log(value)
      firestore.updateDebateFormat(this.courtId, value)
    })
  }

  selectedValue!: string;
  selectedTime!: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = POSITION_DATA;

  authorized: Boolean = false;

  ngOnInit(): void {
    for (let x in FormatConstants.formats) {
      this.formats.push(new Format(x))
    }
  }

  formats: Format[] =[];

  times: Time[] = [
    { value: 15, viewValue: '15 minutes' },
    { value: 30, viewValue: '30 minutes' },
    { value: 45, viewValue: '45 minutes' },
    { value: 60, viewValue: '60 minutes' },
  ];

  selectPosition() {
    console.log('position selected');
  }
}
