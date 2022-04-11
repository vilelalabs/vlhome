import axios from 'axios';
import database from '@react-native-firebase/database';

async function GetValueFromFirebase(allAmbients) {

    let fb_allDevices;
    let finalSnapshot;
    let order;

    //receber todos dispositivos do firebase em um novo array
    const response = await axios.get('https://testeesp8266-ef2ce-default-rtdb.firebaseio.com/.json');
    if (response.data) {
        fb_allDevices = response.data.devices;
    }
    //ao receber modificação de 'value' do firebase, comparar com allAmbients
    allAmbients.forEach(amb => {
        amb.devices.forEach(dev => {
            fb_allDevices.forEach((fb_dev, index) => {
                if (dev.ipAddress === fb_dev.ipAddress) {
                    let dbRef = database().ref(`devices/${index}/`);
                    dbRef.once('value', (snapshot) => {
                        finalSnapshot = snapshot.val().value;
                        dev.value = finalSnapshot;
                        order = dev.order;
                    });
                }
            });
        });
    });

    return { finalSnapshot, order };
}

export default GetValueFromFirebase;