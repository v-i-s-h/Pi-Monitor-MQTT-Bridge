// Module for handling Pi related commands
/*
    This module is based on: https://github.com/PsyChip/node-raspi
*/

// var exec        = require( 'child_process' ).exec;
var execsync    = require( 'sync-runner' );
// var os          = require( 'os' );
var fs          = require( 'fs' );

module.exports = {
    /* Function to get CPU temparature */
    getCpuTemparature: function() {
        return parseInt(fs.readFileSync("/sys/class/thermal/thermal_zone0/temp","utf8").toString().trim()) / 1000;
    },
    /* Function to get GPU temparature */
    getGpuTemparature: function() {
        temp_str    = execsync( "vcgencmd measure_temp" ).toString().trim();
        return parseFloat( temp_str.substr(temp_str.indexOf('=')+1,4) );
    },
    /* Function to measure voltages */
    getVoltage: function( point ) {
        res     = execsync( "vcgencmd measure_volts " + point ).toString().trim();
        return parseFloat( res.substr(res.indexOf('=')+1,6) );
    },
    getVoltCore: function() {
        return this.getVoltage( 'core' );
    },
    getVoltSdramC: function( point ) {
        return this.getVoltage( 'sdram_c' );
    },
    getVoltSdramI: function( point ) {
        return this.getVoltage( 'sdram_i' );
    },
    getVoltSdramP: function( point ) {
        return this.getVoltage( 'sdram_p' );
    }
};


/*
module.exports = {
    shellc: {
        temp: "/sys/class/thermal/thermal_zone0/temp",
        vcc: "vcgencmd measure_volts "
    },
    vcc: ['core', 'sdram_c', 'sdram_i', 'sdram_p'],
    execute: function (command, callback) {
        exec(command, function (error, stdout, stderr) {
            if (typeof callback === 'function') {
                callback(stdout);
            }
            error = null;
            stdout = null;
            stderr = null;
        });
    },
    getVcc: function () {
        var res = 0;
        for (var i = 0; i < this.vcc.length; i++) {
            res += Math.round(this.util.parseParam(execsync(this.shellc.vcc + this.vcc[i]), "volt").slice(0, -1) * 1000);
        }
        return res;
    },
    getThrm: function () {
        return parseInt(fs.readFileSync(this.shellc.temp, "utf8").toString().trim()) / 1000;
    },
    uptime: function () {
        return Math.round((os.uptime() * 1000));
    },
    serviceStart: function (name) {
        this.execute("service " + name + " start");
    },
    serviceStop: function (name) {
        this.execute("service " + name + " stop");
    },
    util: {
        explode: function (str, chr, num) {
            var xx = str.toString();
            var pc = xx.split(chr);
            xx = null;
            return pc[num];
        },
        parseParam: function (input, key) {
            if (input.indexOf("=") <= -1) {
                return "";
            }
            input += '\n';
            var lines = input.split("\n");
            for (var i = 0; i < lines.length; i++) {
                if (this.explode(lines[i], "=", 0).toString().trim() === key) {
                    input = null;
                    key = null;
                    return this.explode(lines[i], "=", 1).toString().trim();
                }
            }
        }
    }
};
*/