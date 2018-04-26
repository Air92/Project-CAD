from gasSensor import gasDensity
from tempSensor import getTemperature, getHumidity
from LCDScreen import LCDSetText, ClearScreen
from LightSensor import LightSensor
import time


def setText(t):
	try:
		LCDSetText(t)
	except IOError:
		print "error"
 
print ("===========TESTING GAS SENSOR=============")
setText("TESTING GAS SENSOR")
for x in range(0,5):
	try:
		#print("Gas Density: {}".format(gasDensity()))
		time.sleep(0.5)
	except IOError:
		print ("Gas Sensor Error")
		LCDSetText("101 Gas Sensor Error")
print ("==========================================")

print ("==TESTING TEMPERATURE & HUMIDITY SENSORS==")
setText("TESTING TEMPERATURE SENSOR")
for x in range(0,5):
        try:
		#print("Humidity: {}").format(getHumidity())
                #print("Temperature: {}".format(getTemperature()))
                time.sleep(0.5)
        except IOError:
                print ("Temperature Sensor Error")
                LCDSetText("102 Temperature Sensor Error")
print ("==========================================")

print ("==========TESTING LIGHT SENSOR============")
setText("TESTING LIGHT SENSOR")
for x in range(0,5):
        try:
                #print("Light Intensity: {}".format(LightSensor()))
                time.sleep(0.5)
        except IOError:
                print ("Light Sensor Error")
                LCDSetText("103 Light Sensor Error")
print ("==========================================")

print ("=========TESTING LCD SCREEN SENSOR========")
for x in range(0,5):
        try:
		LCDSetText("Air 92")
		time.sleep(0.6)
                LCDSetText("Air 92 .")
                time.sleep(0.6)
		LCDSetText("Air 92 ..")
		time.sleep(0.6) 
        except IOError:
                print ("LCD Sensor Error")
print ("==========================================")

ClearScreen()
