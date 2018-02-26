var bleno = require('bleno');

bleno.on('stateChange', function(state){
    if(state === 'poweredOn'){
      bleno.startAdvertising('AttendanceApp', ['12ab']);
    }else{
      bleno.stopAdvertising();
    }
  });