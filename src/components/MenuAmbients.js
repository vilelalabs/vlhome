import React from 'react'
import { View } from 'react-native'
import TabButtonAmbient from './TabButtonAmbient';

import database from '@react-native-firebase/database';

const MenuAmbients = (currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, ambients, handleMenu, setOverLayType) => {

    //reorder ambients based on order property
    (async () => {
        await ambients.sort((a, b) => (a.order > b.order) ? 1 : -1);
    })();

    //send new ambients order to database
    if (ambients[0].name !== 'initAmbient') {
        ambients.forEach(amb => {
            let dbRef = database().ref(`ambients/${amb.order}/`);
            dbRef.update({ "iconName": amb.iconName });
            dbRef.update({ "name": amb.name });
            dbRef.update({ "id": amb.id });
            dbRef.update({ "order": amb.order });
            amb.devices.forEach(dev => {
                let dbRef = database().ref(`ambients/${amb.order}/devices/${dev.order}/`);
                dbRef.update({ "iconName": dev.iconName });
                dbRef.update({ "ipAddress": dev.ipAddress });
                dbRef.update({ "name": dev.name });
                dbRef.update({ "value": dev.value });
                dbRef.update({ "order": dev.order });
                dbRef.update({ "type": dev.type });
            });
        });
    }


    return ambients.map((amb, index) => {

        return (
            <View key={index}>
                {TabButtonAmbient(currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, amb, handleMenu, index, setOverLayType)}
            </View>
        );

    });
}
export default MenuAmbients;