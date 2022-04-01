
class Device {
    constructor(ipAddress, iconName, name, value, order, type) {
        this.ipAddress = ipAddress;
        this.iconName = iconName;
        this.name = name;
        this.value = value;
        this.order = order; //ordem de exibição (externa ao componente)
        this.type = type;
    }
}

export default Device;
