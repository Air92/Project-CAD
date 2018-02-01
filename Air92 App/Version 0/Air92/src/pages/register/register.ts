
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import {LoginPage} from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username = "";
  pass = "";
  email = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: Toast) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public reg() {

    this.postData(this.username, this.pass, this.email).then((result) => {
      console.log(result);
      this.toast.show(this.username + '  has been added', '5000', 'top', ).subscribe(
         toast =>
        {
          this.navCtrl.setRoot(LoginPage);
          console.log(toast);
        }
       )
    });
  }

  postData = (username: string, pass: string, email: string) => {
    var param =
      {
        "name": username,
        "password": pass,
        "email": email,
        "newUser": true
      };

    console.log(JSON.stringify(param));

    var url = 'https://air92.restlet.net:443/v1/userses/';
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.send(JSON.stringify(param));
    });
  }
}

