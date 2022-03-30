import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import SortableGrid from 'react-native-sortable-grid'
var getOrder = require('lodash.get');

import database from '@react-native-firebase/database';

import SingleDeviceOnAmbient from './SingleDeviceOnAmbient'


function AmbientDevices({ ambient }) {
    const [update, setUpdate] = React.useState(true);
    const [updateValues, setUpdateValues] = React.useState(true);

    const [currentDevice, setCurrentDevice] = React.useState({});

    const [device, setDevice] = useState("ambients/0/devices/0/");
    const [value, setValue] = useState([]);
    const [ipAddress, setIpAddress] = useState();


    function handleClick(dev) {
        let dbRef = database().ref(`ambients/${ambient.order}/devices/${dev.order}/`);
        dbRef.update({ "value": (dev.value == "Apagada") ? "Acesa" : "Apagada" });

        const newValue = value;
        dbRef.on("value", dataSnapshot => {
            const importedValue = dataSnapshot.val().value;
            newValue[dev.order] = importedValue;
            dev.value = importedValue;
        });
        setValue(newValue);
        setCurrentDevice(dev);
        setUpdateValues(false);
        setUpdate(false);
    }

    useEffect(() => {
        ambient.devices.sort((a, b) => (a.order > b.order) ? 1 : -1);
        return () => {
            setTimeout(() => {
                setUpdate(true);
            }, 250);
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