var mdns    = require('mdns2')
  , events  = require('events')
  , util    = require('util');

var Browser = function() {
    var self = this
      , devices = {}
      , browser;

    this.browsers = [mdns.createBrowser(mdns.tcp('apple-mobdev')), mdns.createBrowser(mdns.tcp('apple-mobdev2'))];

    for (var i = 0; i < this.browsers.length; i++) {
        browser = this.browsers[i];

        browser.on('serviceUp', function(device) {
            device.lastSeen = new Date();
            devices[device.name] = device;
            self.emit('ideviceonline', device);
        });

        browser.on('serviceDown', function(device) {
            self.emit('ideviceoffline', device);
        });
    }

    this.getDevices = function(dateSinceLastSeen) {
        if (dateSinceLastSeen && !isNaN(dateSinceLastSeen.getTime())) {
            var lastSeenDevices = {};

            for(var i = 0; i < devices.length; i++) {
                if (devices[i].lastSeen.getTime() > dateSinceLastSeen.getTime()) {
                    lastSeenDevices[devices[i].name] = devices[i];
                }
            }
            return lastSeenDevices;
        }

        return devices;
    };

    this.start = function() {
        for (var i = 0; i < this.browsers.length; i++) {
            this.browsers[i].start();
        }
    };
};

util.inherits(Browser, events.EventEmitter);
module.exports = new Browser();