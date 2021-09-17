import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AspService } from 'src/app/services/asp/asp.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupform = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });
  constructor(private authservice: AspService) { }

  ngOnInit(): void {
  }

  public register(){
    console.log(this.signupform.value);

    this.authservice.register(
      this.signupform.value['firstname'],
      this.signupform.valid['lastname']
    );
  }

}
