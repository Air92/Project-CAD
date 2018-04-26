from gasSensor import gasDensity
from tempSensor import getTemperature, getHumidity
from LCDScreen import LCDSetText, ClearScreen
from LightSensor import LightSensor
from serialv2 import SensorData
import time

temp =0
humid =0
particle = 0
light = 0
density =0

for x in range(0,1):

        print ("%s,%s,%s,%s"%(getTemperature(),getHumidity(),"1",gasDensity()))
	sys.stdout.flush()


