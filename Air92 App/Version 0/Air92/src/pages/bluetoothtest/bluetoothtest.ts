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

    this.bluetoothSerial.isEnabled().then((result) => {
      this.bluetoothSerial.list().then((result) => {
        this.bluetoothSerial.write("test").then((result1) =>{
          console.log(result1);
        })
      })
    })
  }
}

   
      
    //  Write a string

  

 