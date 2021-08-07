import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) {}

  checkIfHost(courtId: string) {
    let tmp = this.db.collection('courts').doc(courtId).get().toPromise().then((value) => {
      let doc = value.data()
      let current_host = JSON.parse(JSON.stringify(doc))['host']

      return current_host == localStorage.getItem('current_user')!['email']
    })

    return tmp;
  }

  updatePrepTime(courtId: string, minutes: number) {
    this.db.collection('courts').doc(courtId).update({'preptime': minutes}).then();
  }

  updateDebateFormat(courtId: string, debate_format: string) {
    this.db.collection('courts').doc(courtId).update({'debate_format': debate_format}).then()
  }

  joinTeam(courtId: string, team_number) {
    this.db.collection('courts').doc(courtId).get().toPromise().then((value) => {
      let email = JSON.parse(localStorage.getItem('current_user')!)['email']
      let team_name = "team" + team_number

      let returned_value = value.data()
      let current_participants = JSON.parse(JSON.stringify(returned_value))['participants']
      let current_team = current_participants[team_name]
      console.log(current_participants)
      if (current_team.length < 3) {
        current_team.push(email)
        current_participants[team_name] = current_team

        console.log(current_participants)
        this.db.collection('courts').doc(courtId).update({'participants': current_participants}).then()
      }
    })
  }
}
