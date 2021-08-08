import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  home_page: Boolean = true;

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

    this.router.events.subscribe((value) => {
      if(this.router.url == '/home' || this.router.url == '/login') {
        this.home_page = true;
      } else {
        this.home_page = false;
      }

      console.log(this.home_page)
    })
  }

}
