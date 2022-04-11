import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import SortableGrid from 'react-native-sortable-grid'
var getOrder = require('lodash.get');

import axios from 'axios';
import database from '@react-native-firebase/database';

import SaveFile from '../services/SaveFile';
import GetValueFromFirebase from '../services/GetValueFromFirebase';

import SingleDeviceOnAmbient from './SingleDeviceOnAmbient'


function AmbientDevices({ allAmbients, ambient }) {
    const [update, setUpdate] = React.useState(true);
    const [updateValues, setUpdateValues] = React.useState(true);

    const [currentDevice, setCurrentDevice] = React.useState({});

    const [value, setValue] = useState([]);
    //const [ipAddress, setIpAddress] = useState([]);

    async function autoUpdate() {
        let newValue = value;

        const { finalSnapshot, order } = await GetValueFromFirebase(allAmbients);

        setUpdate(false);
        newValue[order] = finalSnapshot;

        setValue(newValue);
        setUpdateValues(false);

    }

    useEffect(() => {
        (async () => autoUpdate())();

        return () => {
            setUpdate(true);
            setUpdateValues(true);
        }
    }, [allAmbients]);

    async function handleClick(dev) {
        let newValue = value;
        const response = await axios.get('https://testeesp8266-ef2ce-default-rtdb.firebaseio.com/.json');
        if (response.data) {
            fb_allDevices = response.data.devices;
        }

        fb_allDevices.forEach((fb_dev, index) => {
            if (dev.ipAddress === fb_dev.ipAddress) {
                let dbRef = database().ref(`devices/${index}/`);
                let newDeviceValue = 'no value';
                switch (dev.type) {
                    case 'light':
                        newDeviceValue = (dev.value == "Apagada") ? "Acesa" : "Apagada";
                        break;
                    case 'dimmer':
                        //...
                        newDeviceValue = (dev.value == "50%") ? "20%" : "50%";
                        break;
                    case 'gate':
                        //...
                        newDeviceValue = (dev.value == "Fechado") ? "Aberto" : "Fechado";
                        break;
                    default:
                        break;
                }
                dbRef.update({ "value": newDeviceValue });
                dev.value = newDeviceValue;
                newValue[dev.order] = newDeviceValue;
                setCurrentDevice(dev);
                setValue(newValue);
                setUpdateValues(false);
                setUpdate(false);
            }
        });
    }

    useEffect(() => {

        (async () => {
            await ambient.devices.sort((a, b) => (a.order > b.order) ? 1 : -1);
        })();

        //send new ambient.devices to database
        try {
            if (ambient.devices[0].name !== 'initDevice') {
                SaveFile(allAmbients);
            }
        } catch (error) {
            console.log(error);
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