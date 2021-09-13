import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AspService } from '../asp/asp.service';
import firebase from 'firebase/app';
import { promise } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public asp: AspService
  ) { }

  logout(){
    localStorage.removeItem('current_user');
    this.router.navigate(['']);
  }

  isActivated(): Promise<Object> {
    let credentials = JSON.parse(localStorage.getItem('current_user')!);

    if(credentials == null){
      this.logout();
    }
    
    return this.asp.login(
      credentials["token"],
      credentials["email"]
    );
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      provider.addScope('openid');
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          console.log(res);
          firebase.auth().onAuthStateChanged((user) => {
            if(user) {
              user.getIdToken().then((token) => {
                this.login(user.email!, token)
              })
            } else {
              return;
            }
          });
          resolve(res);
        },
        (err) => {
          console.log('Error:');
          console.log(err.code);
          reject(err);
        }
      );
    }).catch((error) => {
      // if(error.code == 'auth/credential-doesnot-exist') {
      //   this.router.navigate(['signup']);
      // }
      // else
      if(error.code == 'auth/account-exists-with-different-credential') {
        let pendingCredentials = error.credential;
        let email = error.email;
        console.log(pendingCredentials);
        console.log(email);
        this.afAuth.fetchSignInMethodsForEmail(email).then((methods) => {
          if (methods[0] == 'facebook.com') {
            let provider = new firebase.auth.FacebookAuthProvider();
            this.afAuth.signInWithPopup(provider).then((res) => {
                if(res.user!.email == email) {
                  res!.user!.linkWithCredential(pendingCredentials).then((usercred) => {
                    firebase.auth().onAuthStateChanged((user) => {
                      if(user) {
                        user.getIdToken().then((token) => {
                          this.login(user.email!, token)
                        })
                      } else {
                        return;
                      }
                    });
                    console.log("Connected facebook and google");
                  })
                }
            });
          }
        });
      }
    })
  }

  login(email: String, token: String){

    let userauthdata = {
      'email': email,
      'token': token
    };

    console.log("current user:");
    console.log(userauthdata);

    localStorage.setItem('current_user', JSON.stringify(userauthdata));

    this.router.navigate(['home']);
  }
}