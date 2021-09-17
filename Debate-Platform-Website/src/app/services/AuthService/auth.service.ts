import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }

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

  login(email: String, token: String) {

    let userauthdata = {
      'email': email,
      'token': token
    };

    // Send login req to server with JWT Token in Authorization header
    // 401: Unauthorized, remove current user.
    // 200: Authorized, move to home

    console.log("current user:");
    console.log(userauthdata['token']);

    localStorage.setItem('current_user', JSON.stringify(userauthdata));

    this.router.navigate(['home']);
  }
}