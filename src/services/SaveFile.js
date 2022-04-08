import RNFetchBlob from 'react-native-fetch-blob';

function SaveFile(allAmbients) {
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/positions.json`;
    const JSONfile = "{\"ambients\": " + JSON.stringify(allAmbients) + "}";
    RNFetchBlob.fs
        .writeFile(pathToWrite, JSONfile, 'utf8')
        .then(() => { })
        .catch(error => console.error(error));
}

export default SaveFile;