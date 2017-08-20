// A system monitor for Raspberry Pi

var pisys   = require( "./pi-system.js" );
var mqtt    = require( "mqtt" );
var fs      = require( "fs" );

// Load saved configuration
var config_path = "./config.json";
var config  = require( config_path );

var conn    = mqtt.connect( config.broker.url, config.broker.options );

var stats_timer = undefined;

// Create publishing function
var stats_publisher = function() {
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
}

conn.on( 'connect', function() {
    // LOG to output
    console.log( "Connected to broker: " + config.broker.url );
    // Publish current configuration
    conn.publish( config.topic.base + "/config/current", JSON.stringify(config) );
    // Make subscriptions
    conn.subscribe( config.topic.base + "/config/+" );    // To recieve CONFIG related commands
    // Set streaming function
    stats_publisher();  // Publish stats once,
    stats_timer = setInterval( stats_publisher, 1000*config.interval ); // Repeat!!
});

conn.on( 'message', function( topic, msg) {
    if( topic === config.topic.base+"/config/interval" ) {
        clearInterval( stats_timer );
        config.interval = parseInt(msg);
        console.log( "Update Interval to " + config.interval );
        stats_publisher();  // publish once
        setInterval( stats_publisher, 1000*config.interval );   // REPEAT!!
        // save new configuration
        fs.writeFile( config_path, JSON.stringify( config, null, 4 ), function( err ) {
            if( err ) {
                console.log( "Error saving new configuration" );
            }
        } );
    }
});