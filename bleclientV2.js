var bleno = require('bleno');
var spawn = require("child_process").spawn;
var encoding = require("encoding");


bleno.on('stateChange', function(state){
console.log("BLE STARTED")
    if(state === 'poweredOn'){
      bleno.startAdvertising('Air92', ['12ab']);
    }else{
      bleno.stopAdvertising();
    }
  });


bleno.on('advertisingStart', function(error){
    if(error){
      // error on advertise start
    }else{
      var pythonProcess = spawn ("python",[PATH_TO_BLUELED]);
      console.log('ADVERTISING START');
      bleno.setServices([
        new bleno.PrimaryService({
          uuid : "12ab",
          characteristics : [
            new bleno.Characteristic({
              value : null,
              uuid : "34cd",
              properties : ['read', 'write'],
              onReadRequest : function(offset,callback){
		sensorData().then((result) =>
		{	
			console.log("read");
			var buffer = new Buffer(result);
			callback(this.RESULT_SUCCESS,buffer);

		})

		}
            })
          ]
        })
      ]);
    }
});

function sensorData()
{ 

		return new Promise((resolve, reject) =>
		{
			
		
	
		var pythonProcess = spawn ("python",[PATH_TO_SENSOR_DATA]);
		pythonProcess.stdout.on("data", function (data)
		{
			//console.log(String.fromCharCode.apply(null,new Uint8Array(data)));
			resolve(data);
		});

		});


}


