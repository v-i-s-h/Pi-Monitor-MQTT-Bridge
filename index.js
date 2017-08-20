// A system monitor for Raspberry Pi

var pisys   = require( "./pi-system.js" );
var mqtt    = require( "mqtt" );

var config  = require( "./config.json" );

var conn    = mqtt.connect( config.broker.url, config.broker.options );

conn.on( 'connect', function() {
    console.log( "Connected to broker: " + config.broker.url );
    setInterval( function() {
        // Get CPU Temparature
        conn.publish( config.topic.base + "/" +config.topic.temp_cpu, 
                        JSON.stringify({value:pisys.getCpuTemparature(),unit:"'C"} ) );
        // Get GPU Temparature
        conn.publish( config.topic.base + "/" +config.topic.temp_gpu, 
                        JSON.stringify({value:pisys.getGpuTemparature(),unit:"'C"} ) );
        // Get CPU Voltages
        conn.publish( config.topic.base + "/" +config.topic.volt_core, 
                        JSON.stringify( {value:pisys.getVoltCore(),unit:"V"} ) );
        conn.publish( config.topic.base + "/" +config.topic.volt_sdram_c, 
                        JSON.stringify( {value:pisys.getVoltSdramC(),unit:"V"} ) );
        conn.publish( config.topic.base + "/" +config.topic.volt_sdram_i, 
                        JSON.stringify( {value:pisys.getVoltSdramI(),unit:"V"} ) );
        conn.publish( config.topic.base + "/" +config.topic.volt_sdram_p, 
                        JSON.stringify( {value:pisys.getVoltSdramP(),unit:"V"} ) );
    }, 1000*config.interval );
});