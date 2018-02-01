import{ Component } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import{ HTTP } from '@ionic-native/http';
import { Toast } from '@ionic-native/toast';
import { LocationPage } from '../location/location';
import { RegisterPage} from '../register/register';

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
export class LoginPage
{
  username = "";
  pass = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private toast: Toast) { }


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad LoginPage');
  }

  loginBtn()
  {

    this.checkLogin().then((result) =>
    {
      if (result == 'Error')
      {
        this.toast.show(`Username or Password is wrong`, '5000', 'top', ).subscribe(
          toast =>
          {
            console.log(toast);
          }
        );
      }
      else
      {
        this.toast.show(`Correct`, '5000', 'top').subscribe(
          toast =>
          {
            this.navCtrl.setRoot(LocationPage);
            console.log(toast);
          }
        );
      }
    });
  }

  checkLogin = () =>
  {
    var url = 'https://air92.restlet.net/v1/userses/?media=json&name=' + this.username + "&password=" + this.pass;
    return new Promise(function (resolve, reject)
    {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function ()
      {

        if (xhr.response == '[]')
        {
          resolve('Error');
        }
        else
        {
          var result = JSON.parse(xhr.response);
          resolve(result);
        }
      };
      xhr.send();
    });
  }

  public registerButton(){
    this.navCtrl.push(RegisterPage);

  }
}
