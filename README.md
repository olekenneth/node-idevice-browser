NodeJS iDevice browser
======================

## SUMMARY

NPM for easily discovering iOS-devices (iOS6 and iOS7) connected to your local network. Emits an event every time it discovers a device. But also keeps track of which devices that been connected so you can getDevice(dateSinceLastSeen).

## INSTALLING

Before installing on Debian systems. You need to `apt-get install libavahi-compat-libdnssd-dev`.

    npm install idevice-browser

Or put this in your `package.json`
    "dependencies": {
        "idevice-browser": "*"
    }


## USAGE

You can use the module in two ways or a combination of the two. Either you can build your own implementation of which devices who is online at the moment by listening to the event emitted `ideviceonline` and `ideviceoffline`. Or you could get the online devices since a spesific date by `idevice.getDevices(dateSinceLastSeen)`.

### Example one
    var idevice = require('idevice-browser');

    idevice.start();

    setInterval(function() { 
        var lastSeen = new Date();
            lastSeen.setTime(lastSeen.getTime() - 3600000);

        console.log(idevice.getDevices(lastSeen));
    }, 5000);

### Example two
    var idevice        = require('idevice-browser')
      , devices        = {}
      , deletedDevices = {};

    idevice.on('ideviceonline', function(device) {
        devices[device.name] = device;
        console.log('Found an iDevice on your network: ' + device.name, device);
    });

    idevice.on('ideviceoffline', function(device) {
        deletedDevices[device.name] = device;
        delete devices[device.name];
        console.log('Remove device', device.name);
    });

    idevice.start();

## LICENSE

MIT, see the LICENSE file