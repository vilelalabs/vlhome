import axios from "axios";
import Factory from './src/logic_components/Factory';

async function getData() {
    let allDevices = [];
    let allAmbients = [];
    const response = await axios.get('https://testeesp8266-ef2ce-default-rtdb.firebaseio.com/.json');

    if (response.data) {
        response.data.ambients.forEach(amb => {
            allAmbients.push(Factory('ambient', amb.iconName, amb.name, amb.devices, amb.order));
        });
        response.data.devices.forEach(dev => {
            allDevices.push(Factory('device', dev.iconName, dev.name, dev.value, dev.order));
        });

        return [allAmbients, allDevices];
    }
}

export default getData;