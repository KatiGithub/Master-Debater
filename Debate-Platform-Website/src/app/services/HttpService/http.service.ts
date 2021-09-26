import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(url: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('current_user')!),
      'Access-Control-Allow-Origin': 'http://localhost:4200/login'
    });
    
    console.log(headers);
    return this.http.get(url, {headers: headers, withCredentials: true});
  }

  
  public post(url: string, data: any){
    let current_user = localStorage.getItem('current_user') as string;
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200/login',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('current_user')!
    });
    console.log(headers);
    return this.http.post(url, data, {headers: headers, withCredentials: true});
  }

}
