import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import SortableGrid from 'react-native-sortable-grid'
var getOrder = require('lodash.get');
import axios from 'axios';

import database from '@react-native-firebase/database';
import RNFetchBlob from 'react-native-fetch-blob';

import SingleDeviceOnAmbient from './SingleDeviceOnAmbient'


function AmbientDevices({ allAmbients, ambient }) {
    const [update, setUpdate] = React.useState(true);
    const [updateValues, setUpdateValues] = React.useState(true);

    const [currentDevice, setCurrentDevice] = React.useState({});

    const [value, setValue] = useState([]);
    //const [ipAddress, setIpAddress] = useState([]);

    async function autoUpdate() {
        const newValue = value;
        let fb_ipAddress;
        let fb_allAmbients;

        //receber todos ambientes e dispositivos do firebase em um novo array
        const response = await axios.get('https://testeesp8266-ef2ce-default-rtdb.firebaseio.com/.json');
        if (response.data) {
            fb_allAmbients = response.data.ambients;
        }
        //ao receber modificação de 'value' do firebase, comparar com allAmbients
        let stopSearch = false;
        fb_allAmbients.forEach(fb_amb => {
            fb_amb.devices.forEach(fb_dev => {
                let dbRef = database().ref(`ambients/${fb_amb.order}/devices/${fb_dev.order}/`);
                dbRef.on('value', (snapshot) => {
                    fb_ipAddress = snapshot.val().ipAddress;
                    //buscar o ipAddress igual e alterando o valor do dispositivo no app.
                    allAmbients.every(amb => {
                        amb.devices.every(dev => {
                            if (dev.ipAddress === fb_ipAddress) {
                                console.log(`Valor no dispositivo com ipAddress ${dev.ipAddress} foi alterado para ${snapshot.val().value}`);
                                setUpdate(false);
                                newValue[dev.order] = snapshot.val().value;
                                dev.value = snapshot.val().value;
                                setValue(newValue);
                                setUpdateValues(false);
                                stopSearch = true;
                            }
                            return stopSearch;
                        })
                        return stopSearch;
                    })
                })
            })
        })


        // liberar o setUpdate(newValue) e setUpdateValues para atualizar o ambiente.

    }

    useEffect(() => {
        (async () => autoUpdate())();

        return () => {
            setUpdate(true);
            setUpdateValues(true);
        }
    }, [ambient]);

    function handleClick(dev) {
        let fb_ipAddress;
        allAmbients.forEach(fb_amb => {
            fb_amb.devices.forEach(fb_dev => {
                let dbRef = database().ref(`ambients/${fb_amb.order}/devices/${fb_dev.order}/`);
                dbRef.once('value', (snapshot) => {
                    fb_ipAddress = snapshot.val().ipAddress;

                    if (fb_ipAddress === dev.ipAddress) {
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
                });
            });
        });
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
                .then(() => { })
                .catch(error => console.error(error));

        }
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