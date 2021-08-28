import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AspService {

  APIURL = "http://localhost:5432/api"
  constructor(private http: HttpClient, private router: Router) { }

  getCourtHost(courtId: string): Observable<string>{
    return this.http.get<string>(this.APIURL + "/" + "courtId" + "/" + courtId);
  }
  
  getCourt(courtId: string): Observable<any>{
    return this.http.get<any>(this.APIURL + "/" + courtId);
  }
  
  
  
  checkIfHost(courtId: string, userEmail: string): Observable<any>{
    return this.http.get<any>(this.APIURL + "/" + courtId + "/" + userEmail);
  }

  

  
  
}
