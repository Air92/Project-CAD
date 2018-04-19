# Project D: Polluted - Air92

One Paragraph of project description goes here

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
To install the application packages you will need ```npm```, which come with ``Node`` installation 
Installing Node

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

<img src="https://github.com/Air92/Project-CAD/blob/master/Air92%20Images/sensorguide.jpg" width="648.4" height="458.5" />



## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Android Studio](https://developer.android.com/studio/install.html) - The IDE used to develop the app

## Contributing

Please read [CONTRIBUTING.md](https://google.com) for details on our code of conduct, and the process for submitting pull requests to us.

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

* Credits to anyone who helped
* Anyone whose code was used
* Inspiration
* etc
