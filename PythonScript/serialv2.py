import time
import serial

def checkValue(buffer, length ):
    recievedflag = False
    recievedSum = 0
    for i in range(0, (length-2)):
        recievedSum = recievedSum + int(buffer[i],16)

    recievedSum = recievedSum + 0x42

    if((int(buffer[length-2],16)<<8)+(int(buffer[length-1],16))==recievedSum):
        recievedflag = True
    
    return recievedflag


def transmitPM01(buffer):
    print int(buffer[3])<<8


def transmitPM2_5(buffer):
    return (int(buffer[5],16)<<8) + int(buffer[6],16)

def transmitPM10(buffer):
    print (int(buffer[7],16)<<8) + int(buffer[8],16)
    

# flush buffer
# start character 42
# second start character 4d
#  byteArray = [elem.encode("hex") for elem in key]
#  print checkValue(byteArray,length)
#  print transmitPM2_5(byteArray)
#  print byteArray


input = "42"
length = 31
serialport = serial.Serial("/dev/serial0", 9600, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS, timeout=1500)
#test = serialport.write(serial.to_bytes([0x4D]))
time.sleep(0.1)



def SensorData():
        startArray = serialport.read(1)
	startArray = [elem.encode("hex") for elem in startArray]
	if(int(startArray[0],16) == 66):
		print "42 start character found"
		byteArray = serialport.read(length)
		byteArray = [elem.encode("hex") for elem in byteArray]
		if(int(byteArray[0],16)== 0x4d):
			print "4d start character found"
			return ransmitPM2_5(byteArray)
		time.sleep(0.5)

