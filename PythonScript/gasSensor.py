import time
import grovepi



# Connect the Grove Gas Sensor to analog port A0
# SIG,NC,VCC,GND
gas_sensor = 0

grovepi.pinMode(gas_sensor,"INPUT")


def gasDensity():
	sensor_value = grovepi.analogRead(gas_sensor)
	density = (float)(sensor_value / 1024)
	return density

