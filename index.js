// A system monitor for Raspberry Pi

var pisys   = require( "./pi-system.js" );
var mqtt    = require( "mqtt" );

var baseTopic   = "user/vish/device/pandora";    // change for each device

var broker  = "mqtt://pandora.local";
var options = {
    port: 1883,
    client_id: 'pi-monitor-bridge'
};

var conn    = mqtt.connect( broker, options );

conn.on( 'connect', function() {
    console.log( "Connected to broker: " + broker );
    setInterval( function() {
        // Get CPU Temparature
        msg = { value: pisys.getCpuTemparature(), unit: "'C" }; 
        conn.publish( baseTopic + "/temp/cpu", JSON.stringify(msg) );
        // Get GPU Temparature
        msg = { value: pisys.getGpuTemparature(), unit: "'C" };
        conn.publish( baseTopic + "/temp/gpu", JSON.stringify(msg) );
        // Get CPU Voltages
        conn.publish( baseTopic + "/volt/core",
                JSON.stringify( {value:pisys.getVoltCore(),unit:"V"} ) );
        conn.publish( baseTopic + "/volt/sdram_c",
                JSON.stringify( {value:pisys.getVoltSdramC(),unit:"V"} ) );
        conn.publish( baseTopic + "/volt/sdram_i",
                JSON.stringify( {value:pisys.getVoltSdramI(),unit:"V"} ) );
        conn.publish( baseTopic + "/volt/sdram_p",
                JSON.stringify( {value:pisys.getVoltSdramP(),unit:"V"} ) );
    }, 5000 );
});