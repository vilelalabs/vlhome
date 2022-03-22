

import Ambient from "./Ambient";
import Device from "./Device";

//const { Ambient } = require("./logic_components/Ambient");
//const { Device } = require("./logic_components/Device");

function Factory(type, iconName, name, value, order) {
    switch (type) {
        case 'ambient':
            return new Ambient(iconName, name, value, order);
        case 'device':
            return new Device(iconName, name, value, order);
        default:
            return null;
    }
}

export default Factory; 