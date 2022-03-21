import React, { useState, useEffect } from 'react'
import SortableGrid from 'react-native-sortable-grid'
var getOrder = require('lodash.get');

import database from '@react-native-firebase/database';


import SingleDeviceOnAmbient from './SingleDeviceOnAmbient'

function AmbientDevices({ ambient }) {
    const [update, setUpdate] = React.useState(true);
    const [updateValues, setUpdateValues] = React.useState(true);

    const[currentDevice, setCurrentDevice] = React.useState({});

    const [device, setDevice] = useState("lampadaQuarto");
    const [value, setValue] = useState();
    const [ipAddress, setIpAddress] = useState();

    useEffect(() => {
        const interval = setInterval(async () => {
            let dbRef = database().ref(`${device}/`);
            dbRef.on("value", dataSnapshot => {
                setValue(dataSnapshot.val().value);
                setIpAddress(dataSnapshot.val().ipAddress);
                //console.log("value:", value);
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [value]);


    function handleClick(dev) {
        let dbRef = database().ref(`${device}/`);
        setValue(value == "0" ? "1" : "0");
        dbRef.update({ "value": value == "0" ? "1" : "0" });
        setCurrentDevice(dev);
        setUpdateValues(false);     

    }

    useEffect(() => {
        ambient.devices.sort((a, b) => (a.order > b.order) ? 1 : -1);
        return () => {
            setUpdate(true);
        }
    }, [update]);

    useEffect(() => {
        currentDevice.value = (value == "0") ? "Apagada" : "Acesa";
        return () => {
            setUpdateValues(true);
        }
    }, [updateValues]);



    useEffect(() => {

        console.log(`novo valor: ${value} no device`);
    }, [value]);


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
        </>
    );
}
export default AmbientDevices;