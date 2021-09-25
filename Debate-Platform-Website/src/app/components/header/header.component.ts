import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AspService } from 'src/app/services/asp/asp.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(
    public router: Router,
    private asp: AspService,
    private auth: AuthService
  ) { }

  home_page: Boolean = true;
  user_name: string = '';

  ngOnInit(): void {
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   console.log(this.router.url)
    //   if(this.router.url == '/home' || this.router.url == '/login') {
    //     this.home_page = true;
    //   } else {
    //     this.home_page = false;
    //   }
    // });
    this.user_name = localStorage.getItem('user-firstname')!;
    this.router.events.subscribe((value) => {
      if(this.router.url == '/home' || this.router.url == '/login') {
        this.home_page = true;
      } else {
        this.home_page = false;
      }

      // console.log(this.home_page)
    })
  }

  logout(): void{
    this.auth.logout();
  }

  seeProfile(): void{
    this.router.navigate(['/profile']);
  }

}
