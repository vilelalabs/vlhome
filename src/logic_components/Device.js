
class Device {
    constructor(iconName, name, deviceStatus, order) {
        this.iconName = iconName;
        this.name = name;
        this.deviceStatus = deviceStatus;
        this.order  = order; //ordem de exibição (externa ao componente)
    }
}

export default Device;
