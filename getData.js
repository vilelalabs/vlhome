import Factory from './src/logic_components/Factory';

import RNFetchBlob from 'react-native-fetch-blob';

let initData = require('./positions.json');
let data = initData;
async function getData() {
    let allAmbients = [];
    //read data with RNFetchBlob
    const pathToRead = `${RNFetchBlob.fs.dirs.DocumentDir}/positions.json`;
    try {
        data = JSON.parse(await RNFetchBlob.fs.readFile(pathToRead, 'utf8'));
        console.log('Arquivo lido com sucesso!')
    } catch (error) {
        console.log(error);
        console.log('File not found');
    }

    if (data) {
        data.ambients.forEach(amb => {
            allAmbients.push(Factory('ambient', amb.id, amb.iconName, amb.name, amb.devices, amb.order));
        });
        return allAmbients;
    }
    else {
        initData.ambients.forEach(amb => {
            allAmbients.push(Factory('ambient', amb.id, amb.iconName, amb.name, amb.devices, amb.order));
        });
        console.log('no data');
        return allAmbients;
    }
}

export default getData;