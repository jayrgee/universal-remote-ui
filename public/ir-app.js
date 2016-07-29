var irApp = irApp || {};

(function (ns) {
    'use strict';

    var _devices = {};

    ns.devices = function () {
        return _devices;
    };

    // initialise devices (with default values if missing)
    ns.InitDevices = function (devices) {
        Object.keys(devices).forEach(function (key) {

            var dvc = devices[key],
                commands = dvc.commands || {};

            dvc.dvcId = dvc.dvcId || 0;
            dvc.name = dvc.name || "unnamed device";

            Object.keys(commands).forEach(function (key) {
                //console.log(key);
                var cmd = commands[key];
                cmd.name = key.replace(/_/g, " ");
                cmd.dvcName = dvc.name;
                cmd.data = {
                    dvcId: dvc.dvcId || 0,
                    cmdId: cmd.cmdId || 0
                };
                //cmd.device = dvc;
                //console.log(cmd);
            });
        });

        _devices = devices;
    };

}(irApp));