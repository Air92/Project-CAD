from grovepi import *
from grove_rgb_lcd import *
from time import sleep
from math import isnan

dht_sensor_port = 7 # connect the DHt sensor to port 7
dht_sensor_type = 0


def getTemperature():
	[temp,hum] = dht(dht_sensor_port,dht_sensor_type)
	return temp

def getHumidity():
	[temp,hum] = dht(dht_sensor_port,dht_sensor_type)
	return hum   



getTemperature()
getHumidity()	
