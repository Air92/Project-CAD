
from grovepi import *
from grove_rgb_lcd import *
from time import sleep
from math import isnan

# set green as backlight color
# we need to do it just once
# setting the backlight color once reduces the amount of data transfer over the I2C line
setRGB(83,180,245)

def LCDSetText(text):
   setText_norefresh(text)

def ClearScreen():
	setText_norefresh("")

def dataSet(text):
	for x in range (0,255):
		setRGB(x,255-x,255-x)
		sleep(0.1)
		setText_norefresh("".format(x))
