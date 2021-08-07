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
}
