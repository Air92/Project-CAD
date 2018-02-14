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
    this.bluetoothSerial.write([186, 220, 222]).then((success)=>{
      console.log(success);});

    this.bluetoothSerial.isEnabled().then(res => {

      // this.bluetoothSerial.list();
			// this.bluetoothSerial.connect(phone);
			// this.bluetoothSerial.isConnected().then(res => {
			// 	console.log(res);
			// }).catch(res => {
			// 	console.log('Fail2!');
			// 	console.log(res);
      // });
      
      // Write a string
this.bluetoothSerial.write([186, 220, 222]).then((success)=>{
  console.log(success);
});
      this.bluetoothSerial.list();
      this.bluetoothSerial.connect(phone);
      this.bluetoothSerial.list();
<<<<<<< HEAD
=======
      this.bluetoothSerial.list();
>>>>>>> cc6b5558dd05c61b30439a18bafd750bd95def03
			this.bluetoothSerial.isConnected().then(res => {
				console.log(res);
			}).catch(res => {
				console.log('Fail2!');
				console.log(res);
			});

		}).catch(res => {
      console.log('Fail!');
      console.log('Fail!a');
		});


    
  }

}
