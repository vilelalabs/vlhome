
class Device {
    constructor(iconName, name, value, order) {
        this.iconName = iconName;
        this.name = name;
        this.value = value;
        this.order = order; //ordem de exibição (externa ao componente)
    }
}

export default Device;
