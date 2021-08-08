import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { convertTimestamp } from 'convert-firebase-timestamp';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private db: AngularFirestore, private router: Router) {}

  checkIfHost(courtId: string) {
    return this.db
      .collection('courts')
      .doc(courtId)
      .get()
      .toPromise()
      .then((value) => {
        let doc = value.data();
        let current_host = JSON.parse(JSON.stringify(doc))['host']['email'];

        let user = JSON.parse(localStorage.getItem('current_user')!)['email'];

        return user == current_host ? true : false;
      });
  }

  updatePrepTime(courtId: string, minutes: number) {
    this.db
      .collection('courts')
      .doc(courtId)
      .update({ preptime: minutes })
      .then();
  }

  updateDebateFormat(courtId: string, debate_format: string) {
    this.db
      .collection('courts')
      .doc(courtId)
      .update({ debate_format: debate_format })
      .then();
  }

  joinTeam(courtId: string, team_number) {
    this.db
      .collection('courts')
      .doc(courtId)
      .get()
      .toPromise()
      .then((value) => {
        let email = JSON.parse(localStorage.getItem('current_user')!)['email'];
        let team_name = 'team' + team_number;

        let returned_value = value.data();
        let current_participants = JSON.parse(JSON.stringify(returned_value))[
          'participants'
        ];
        let current_team = current_participants[team_name];
        console.log(current_participants);
        if (current_team.length < 3) {
          current_team.push(email);
          current_participants[team_name] = current_team;

          console.log(current_participants);
          this.db
            .collection('courts')
            .doc(courtId)
            .update({ participants: current_participants })
            .then();
        }
      });
  }

  checkForChange(courtId: string) {
    return this.db.collection('courts').doc(courtId).snapshotChanges();
  }

  getCurrentTeams(courtId: string) {
    return this.db
      .collection('courts')
      .doc(courtId)
      .get()
      .toPromise()
      .then((value) => {
        let current_value = JSON.parse(JSON.stringify(value.data()));
        console.log(current_value);

        current_value = {
          team1: current_value['participants']['team1'],
          team2: current_value['participants']['team2'],
        };

        return current_value;
      })
      .catch((err) => {
        console.log('error here');
      });
  }

  getFormat(courtId: string) {
    return this.db
      .collection('courts')
      .doc(courtId)
      .get()
      .toPromise()
      .then((value) => {
        let current_value = JSON.parse(JSON.stringify(value.data()));

        console.log(current_value)
        return current_value.debate_format;
      });
  }

  goToNextStage(courtId: string, current_stage: number) {
    this.db
      .collection('courts')
      .doc(courtId)
      .update({ state: current_stage + 1 })
      .then();
  }

  updateTopic(courtId: string, topic: string) {
    this.db.collection('courts').doc(courtId).update({ topic: topic }).then();
  }

  getStartTime(courtId: string) {
    return this.db
      .collection('courts')
      .doc(courtId)
      .get()
      .toPromise()
      .then((value) => {
        let current_value = JSON.parse(JSON.stringify(value.data()));

        let startTime = convertTimestamp(current_value['startTime'])

        return startTime;
      });
  }

  getPrepTime(courtId: string) {
    return this.db.collection('courts').doc(courtId).get().toPromise().then((value) => {
      let current_value = JSON.parse(JSON.stringify(value.data()));

      return current_value['preptime']
    })
  }
}
