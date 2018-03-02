
key = "123456789"
length = 9

def checkValue(buffer, length ):
    recievedflag = False
    recievedSum = 0
    for i in range(0, (length-2)):
        recievedSum = recievedSum + int(buffer[i])

    recievedSum = recievedSum + 0x42

    if((int(buffer[length-2])<<8)+(int(buffer[length-1]))==recievedSum):
        recievedflag = True
    
    return recievedflag


def transmitPM01(buffer):
    return (int(buffer[3])<<8) + int(buffer[4])


def transmitPM2_5(buffer):
    return (int(buffer[5])<<8) + int(buffer[6])

def transmitPM10(buufer):
    return (int(buffer[7])<<8) + int(buffer[8])
    

# flush buffer
# start character 42
# second start character 4d
byteArray = [elem.encode("hex") for elem in key]
print checkValue(byteArray,length)
print transmitPM2_5(byteArray)
print byteArray



