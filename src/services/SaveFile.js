import RNFetchBlob from 'react-native-fetch-blob';

const debug = false;

function SaveFile(allAmbients) {
    let pathToWrite;
    if (!debug) {
        pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/positions.json`;
    }
    else {
        pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/positions.json`;
    }

    const JSONfile = "{\"ambients\": " + JSON.stringify(allAmbients) + "}";
    RNFetchBlob.fs
        .writeFile(pathToWrite, JSONfile, 'utf8')
        .then(() => {

            if (debug) {
                console.log('File saved');
            }
        })
        .catch(error => console.error(error));
}

export default SaveFile;