import bluetooth

hostMACAddress = 'B8:81:98:9B:8A:6A' # The MAC address of a Bluetooth adapter on the server. The server might have multiple Bluetooth adapters.
port = 3
backlog = 1
size = 1024
s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
s.bind((hostMACAddress, port))
s.listen(backlog)
print "open"
try:
    client, clientInfo = s.accept()
    while 1:
        data = client.recv(size)
        print "test"
        if data:
            print(data)
            client.send(data) # Echo back to client
except:	
    print("Closing socket")
    client.close()
    s.close()