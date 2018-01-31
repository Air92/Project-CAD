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



  }

  private placeDecode(address: string)
  {
    var url = 'https://air92.restlet.net/v1/userses/?media=json&name='+this.username+"&password="+ this.pass;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function () {
          console.log(xhr.response);
          resolve(xhr.response);
      };
      xhr.send();
    });
  
  }
}
