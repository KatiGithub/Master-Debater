import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(url: string){
    let current_user = localStorage.getItem('current_user') as string;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(current_user)['token'],
      'Access-Control-Allow-Origin': 'http://localhost:4200/login'
    });
    console.log(headers);
    return this.http.get(url, {headers: headers, withCredentials: true});
  }

  public post(url: string, data: any){
    let current_user = localStorage.getItem('current_user') as string;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer' + localStorage.getItem('current_user')!['token']
    });
    return this.http.post(url, data, {headers: headers});
  }

}
