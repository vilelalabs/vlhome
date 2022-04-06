import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import SortableGrid from 'react-native-sortable-grid'
var getOrder = require('lodash.get');

import database from '@react-native-firebase/database';
import RNFetchBlob from 'react-native-fetch-blob';

import SingleDeviceOnAmbient from './SingleDeviceOnAmbient'


function AmbientDevices({ allAmbients, ambient }) {
    const [update, setUpdate] = React.useState(true);
    const [updateValues, setUpdateValues] = React.useState(true);

    const [currentDevice, setCurrentDevice] = React.useState({});

    const [value, setValue] = useState([]);
    //const [ipAddress, setIpAddress] = useState([]);

    function autoUpdate() {
        const newValue = value;
        let fullDevice = {};
        // stream values from firebase realtime database
        if (ambient.devices[0].name !== 'initDevice') {
            ambient.devices.forEach(dev => {
                let dbRef = database().ref(`ambients/${ambient.order}/devices/${dev.order}/`);
                dbRef.on('value', (snapshot) => {
                    console.log("ON_value");
                    if (snapshot.val().value) {
                        setUpdate(false);
                        /*buscar o valor a ser alterado pelo IP do mesmo device "clicado" */
                        newValue[dev.order] = snapshot.val().value;
                        dev.value = snapshot.val().value;
                        setValue(newValue);
                        setUpdateValues(false);
                    }
                });
            });
        }
    }

    useEffect(() => {
        autoUpdate();

        return () => {
            setUpdate(true);
            setUpdateValues(true);
        }
    }, [ambient]);

    function handleClick(dev) {
        let dbRef = database().ref(`ambients/${ambient.order}/devices/${dev.order}/`);
        let newDeviceValue = 'no value';
        switch (dev.type) {
            case 'light':
                newDeviceValue = (dev.value == "Apagada") ? "Acesa" : "Apagada";
                break;
            case 'dimmer':
                //...
                break;
            case 'gate':
                //...
                break;
            default:
                break;
        }


        dbRef.update({ "value": newDeviceValue });

        const newValue = value;

        newValue[dev.order] = newDeviceValue;
        dev.value = newDeviceValue;

        setValue(newValue);
        setCurrentDevice(dev);
        setUpdateValues(false);
        setUpdate(false);
    }


    useEffect(() => {

        (async () => {
            await ambient.devices.sort((a, b) => (a.order > b.order) ? 1 : -1);
        })();

        //send new ambient.devices to database
        if (ambient.devices[0].name !== 'initDevice') {
            const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/positions.json`;

            const JSONfile = "{\"ambients\": " + JSON.stringify(allAmbients) + "}";
            RNFetchBlob.fs
                .writeFile(pathToWrite, JSONfile, 'utf8')
                .then(() => {
                    console.log(`wrote file on ${pathToWrite}`);

                })
                .catch(error => console.error(error));

        }

        /*let dbRef = database().ref(`ambients/${ambient.order}/devices/${dev.order}/`);
        dbRef.update({ "iconName": dev.iconName });
        dbRef.update({ "ipAddress": dev.ipAddress });
        dbRef.update({ "name": dev.name });
        dbRef.update({ "value": dev.value });
        dbRef.update({ "order": dev.order });
        dbRef.update({ "type": dev.type });*/
        //});

        return () => {

            setTimeout(() => {
                setUpdate(true);
            }, 300);
        }
    }, [update]);

    useEffect(() => {
        currentDevice.value = value[currentDevice.order];
        return () => {
            setUpdateValues(true);
        }
    }, [updateValues]);

    return (
        <>
            {update && <SortableGrid
                onDragRelease={(itemOrder) => {
                    var finalOrder = getOrder(itemOrder, `itemOrder`);

                    finalOrder.map((item) => {
                        ambient.devices[item.key].order = item.order;

                    });
                    setUpdate(false);

                }}
                itemsPerRow={3}
                dragActivationTreshold={1000} // will be 3000 in production
            >
                {ambient.devices.map((dev, index) =>
                    <SingleDeviceOnAmbient
                        key={index}
                        iconName={dev.iconName}
                        deviceName={dev.name}
                        deviceStatus={dev.value}
                        onTap={() => {
                            handleClick(dev);
                        }}
                    />
                )}
            </SortableGrid>}
            {!update &&
                <View style={{ alignContent: "center", justifyContent: "center" }}>
                    <ActivityIndicator style={{ height: "100%", width: "100%" }} size="large" color="#F9943B" />
                </View>
            }
        </>
    );
}
export default AmbientDevices;