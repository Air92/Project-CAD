import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  HTTP
} from '@ionic-native/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username = "";
  pass = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginBtn() {
    console.log(this.username);
    console.log(this.pass);

    this.http.get('https://air92.restlet.net/v1/userses/?media=json', {}, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
    //https://air92.restlet.net/v1/userses/?media=json
    //'https://air92.restlet.net/v1/userses/?media=json?username='+ this.username + '&password='+ this.pass, false )


  }
}
