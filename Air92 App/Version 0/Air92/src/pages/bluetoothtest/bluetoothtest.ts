import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
/**
 * Generated class for the BluetoothtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetoothtest',
  templateUrl: 'bluetoothtest.html',
})
export class BluetoothtestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial: BluetoothSerial) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothtestPage');
    this.blue();
  }

  blue()
  {

    var phone = "74:DF:BF:51:7D:8A";
    //this.bluetooth.connect(phone);
    
    this.bluetoothSerial.isEnabled().then(res => {

      this.bluetoothSerial.list();
      this.bluetoothSerial.connect(phone);
      this.bluetoothSerial.list();
			this.bluetoothSerial.isConnected().then(res => {
				console.log(res);
			}).catch(res => {
				console.log('Fail2!');
				console.log(res);
			});

		}).catch(res => {
			console.log('Fail!');
		});


    
  }

}
