
class Ambient {

    constructor(iconName, name, devices, order) {
        this.iconName = iconName;
        this.name = name; 
        this.devices = devices; //array de dispositivos (class Device instance)
        this.order = order; //ordem de exibição (externa ao componente)
    }
}

export default Ambient;
