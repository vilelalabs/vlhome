import React, { useEffect } from 'react'
import SortableGrid from 'react-native-sortable-grid'
var getOrder = require('lodash.get');

import SingleDeviceOnAmbient from './SingleDeviceOnAmbient'

function AmbientDevices({ ambient }) {
    const [devices, setDevices] = React.useState(ambient.devices);
    const [update, setUpdate] = React.useState(true);

    useEffect(() => {
        setDevices(ambient.devices);
    }, []);

    useEffect(() => {
        ambient.devices.sort((a, b) => (a.order > b.order) ? 1 : -1); 
        return () => {
            setUpdate(true);
        }
    }, [update]);
    return (
        <>
            {update && <SortableGrid
                onDragRelease={(itemOrder) => {
                    var finalOrder = getOrder(itemOrder, `itemOrder`);
                    finalOrder.map((item) => {
                        ambient.devices[item.key].order = item.order;
                    });
                    //setDevices(ambient.devices);
                    ambient.devices.map((device) => {
                        //console.log(`O dispositivo ${device.name} foi movido para a posição ${device.order}`);
                    });
                    setDevices(ambient.devices);
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
                        deviceStatus={dev.deviceStatus}
                    />
                )}
            </SortableGrid>}
        </>
    );
}
export default AmbientDevices;