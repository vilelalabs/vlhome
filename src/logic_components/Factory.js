

import Ambient from "./Ambient";
import Device from "./Device";

//const { Ambient } = require("./logic_components/Ambient");
//const { Device } = require("./logic_components/Device");

function Factory(type, identifier, iconName, name, value, order, typ) {
    switch (type) {
        case 'ambient':     // id                          devices
            return new Ambient(identifier, iconName, name, value, order);
        case 'device':     // ipAddress                   value
            return new Device(identifier, iconName, name, value, order, typ);
        default:
            return null;
    }
}

export default Factory; 