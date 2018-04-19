# Project D: Polluted - Air92

The project is to allow people to see how much pollution people are come into contact with their daily commutes to and from work or other journeys. The reasoning behind this project to is ensure people are aware of the effects of pollution as people don't pay as much attention to negative effects. 

<p align="center">
<img align="middle" src="https://github.com/Air92/Project-CAD/blob/master/Air92%20Images/IMG-20180418-WA0003.jpg" width="341.3" height="256" />
 </p>

# Getting Started

These instructions will get you a copy of the project up and running on your Raspberry Pi, phone and backend for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### Application
To deploy the application you will need [**Node**](https://nodejs.org/en/), [**Cordova**](https://evothings.com/doc/build/cordova-install-windows.html), [**Angular**](https://www.npmjs.com/package/angular) and [**Ionic**](https://ionicframework.com/docs/intro/installation/).

#### Raspberry Pi
To deploy the sensors you will need a [**Raspberry Pi 3**](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/).

#### Sensors
* [**Grove Pi Board**](https://www.amazon.com/seeed-studio-FBA_Seeedstudio-103010002-Seeedstudio-GrovePi/dp/B01ANDPDQE/ref=sr_1_1_sspa?ie=UTF8&qid=1524067653&sr=8-1-spons&keywords=grovepi%2B&psc=1&pldnSite=1)
* [**Mulitchannel Gas Sensor**](https://www.modmypi.com/raspberry-pi/sensors-1061/grove-sensors-1099/grove-multichannel-gas-sensor)
* [**DFRobot PM2.5 laser dust sensor**](https://www.dfrobot.com/product-1272.html)
* [**Temperature&Humidity Sensor**](https://www.modmypi.com/raspberry-pi/sensors-1061/grove-sensors-1099/grove-temperature-and-humidity-sensor-high-accuracy-and-mini)
* [**Light Sensor**](https://www.modmypi.com/raspberry-pi/sensors-1061/grove-sensors-1099/dexter--grovepi-light-sensor-sen11302p)

#### Additional Equitment 
* [**LCD RGB Backlight**](https://www.modmypi.com/raspberry-pi/sensors-1061/grove-sensors-1099/grove-lcd-rgb-backlight)
* [**Red LED**](https://www.modmypi.com/raspberry-pi/sensors-1061/grove-sensors-1099/dexter--grovepi-led-red-com04054p)
* [**Blue LED**](https://www.modmypi.com/raspberry-pi/sensors-1061/grove-sensors-1099/dexter--grovepi-led-blue)


## Installing
### Application
To install the application packages you will need ```npm```, comes with ``Node`` installation 


#### Node
Download Node from https://nodejs.org/en/download/ for you OS
```
node --version
```

#### Cordova 
```
npm install -g cordova
cordova --version
```

#### Angular
```
npm install angular
```

#### Ionic
```
npm install -g ionic
ionic info
```

### Sensors
First install the latest version of [**Rasbian OS**](https://www.raspberrypi.org/documentation/installation/installing-images/) onto the Raspberry Pi.

Once Rasbian is installed [**Grove Drivers**]() need to be installed.

#### Grove Drivers
```
sudo curl -kL dexterindustries.com/update_grovepi | bash
sudo reboot
```


Attach the Grove Sensors corresponding to the diagram below.

<p align="center">
<img src="https://github.com/Air92/Project-CAD/blob/master/Air92%20Images/sensorguide.jpg" width="648.4" height="458.5" align="middle"/>
</p>


## Deployment

### Application
#### Android
To deploy the application open the ```cmd``` (windows) or ```terminal``` (linux) and navigate to ```Project-CAD/Air92 App/Version 0/Air92/src/```

Connect android phone to Computer and [***Enable Debugging***](https://www.embarcadero.com/starthere/xe5/mobdevsetup/android/en/enabling_usb_debugging_on_an_android_device.html)
 
Then run ```ionic cordova run android --device```

#### IOS
First you have to create a Apple Provisioning Profile

**Using an Apple ID**
* Open Xcode preferences (Xcode > Preferences…)
* Click the ‘Accounts’ tab
* Login with your Apple ID (+ > Add Apple ID…)

**Running Your App**
* Run a production build of your app with ionic cordova build ios --prod
* Open the .xcodeproj file in platforms/ios/ in Xcode
* Connect your phone via USB and select it as the run target
* Click the play button in Xcode to try to run your app

### Sensors

## Built With

* [Ionic](https://ionicframework.com/)
* [Visual Studio Code](https://code.visualstudio.com/)


## Authors

* **Abd-Assamad Achouri** - *Project manager* - [Achouri12](https://github.com/Achouri12)
* **Yusof Bandar** - *Technical lead* - [YusofBandar](https://github.com/YusofBandar)
* **Evans Mensah Adeenu** - *Team member* - [emAdeenu](https://github.com/emAdeenu)
* **Naim Ahmed** - *Team member* - [NaimAhmed](https://github.com/NaimAhmed)
* **Faran Azadi** - *Team member* - [FaranAz96](https://github.com/FaranAz96)
* **Hamza Asif** - *Team member* - [Repjaws](https://github.com/Repjaws)

See also the list of [contributors](https://github.com/Air92/Project-CAD/contributors) who participated in this project.

## License

This project is licensed under the XYZ License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Papa Johns for Keeping us going
