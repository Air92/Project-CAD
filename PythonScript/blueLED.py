
from grovepi import *

# Connect the Grove LED to digital port D1
led = 3

pinMode(led,"OUTPUT")
time.sleep(1)

while True:
	digitalWrite(led,1)		# Send HIGH to switch on LED
