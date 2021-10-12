import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from '../HttpService/http.service';
import { first, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AspService {
  //endpoints
  APIURL = 'http://localhost:5000';
  constructor(private http: HttpService, private router: Router) {}

  login(token: string, email: string): Promise<Object> {
    // let bodystring = JSON.stringify({
    //   "email": email,
    //   "token": token
    // })
    return this.http.get(this.APIURL + '/auth/login').toPromise();
  }

  signUp(credentials: Object) {
    return this.http.post(this.APIURL + '/auth/signup', credentials);
  }

  register(firstname: string, lastname: string) {
    let bodystring = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
    });
    return this.http.post(this.APIURL + '/auth/register', bodystring);
  }

  getCourtHost(courtId: string) {
    return this.http.get(this.APIURL + '/' + 'courtId' + '/' + courtId);
  }

  // async function createCourt(): Promise {
    
  // } 
  createCourt(){
    return this.http.post(this.APIURL + '/court/create', {responseType: 'json'});
  }

  getCourt(courtId: string) {
    // courtId = courtId.substring(1, courtId.length-1)
    // console.log(courtId);
    return this.http.get(this.APIURL + '/court/retrieve/' + courtId);
  }

  checkIfHost(courtId: string, userEmail: string) {
    return this.http.get(this.APIURL + '/' + courtId + '/' + userEmail);
  }

  getSpeaker(courtId: string) {
    return this.http.get(this.APIURL + '/') as Observable<string>;
  }

  joinCourt(courtId: string) {
    return this.http.get(this.APIURL + '/court/join/' + courtId);
  }
}
