import grovepi

light_sensor = 2

grovepi.pinMode(light_sensor,"INPUT")

def LightSensor():
	sensor_value = grovepi.analogRead(light_sensor)
	RESISTANCE = (float)(1023 - sensor_value)*10
	return RESISTANCE
