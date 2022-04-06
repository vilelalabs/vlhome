import Factory from './src/logic_components/Factory';

import RNFetchBlob from 'react-native-fetch-blob';
let data = require('./src/logic_components/initData.json');
//import data from './positions.json'

async function getData() {
    let allAmbients = [];
    //const response = await axios.get('https://testeesp8266-ef2ce-default-rtdb.firebaseio.com/.json');

    //read data with RNFetchBlob
    const pathToRead = `${RNFetchBlob.fs.dirs.DocumentDir}/positions.json`;
    data = JSON.parse(await RNFetchBlob.fs.readFile(pathToRead, 'utf8'));
    if (data) {
        data.ambients.forEach(amb => {
            console.log(amb.name);
            allAmbients.push(Factory('ambient', amb.id, amb.iconName, amb.name, amb.devices, amb.order));
        });
        return allAmbients;
    }
    else {
        console.log('no data');
        return allAmbients;
    }
}

export default getData;