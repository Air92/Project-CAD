from gasSensor import gasDensity
from tempSensor import getTemperature, getHumidity
from LCDScreen import LCDSetText, ClearScreen
from LightSensor import LightSensor
import time

print ("========TESTING GAS SENSOR ===============")
for x in range(0,5):
	try:
		test= gasDensity()
		print ("Gas Density: %s"%(test))
		time.sleep(0.5)
	except IOError:
		print ("Gas Sensor Error")
		LCDSetText("Gas Sensor Error")
	
print ("==========================================")

print ("==TESTING TEMPERATURE & HUMIDITY SENSOR===")
for x in range(0,7):
	try:
		print ("Temperature: %s"%(getTemperature()))
		print ("Humidity: %s"%(getHumidity()))
		time.sleep(0.5)
	except IOError:
		print ("Temperature Sensor Error")
		LCDSetText("Temperature Sensor Error")
print ("==========================================")

print ("========TESTING LIGHT SENSOR =============")


print ("============TESTING LCD SCREEN============")
print ("Look at screen")
for x in range(0,5):
	try:
		LCDSetText("Air92 =")
		time.sleep(0.1)
		LCDSetText("Air92 ==")
		time.sleep(0.1)
		LCDSetText("Air92 ===")
		time.sleep(0.1)
		LCDSetText("Air92 ====")
		time.sleep(0.1)
		LCDSetText("Air92 =====")
	except:
		print ("LCD Error")
	
ClearScreen()
print ("==========================================")

