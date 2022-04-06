import React from 'react'
import { View } from 'react-native'
import TabButtonAmbient from './TabButtonAmbient';

import database from '@react-native-firebase/database';

const MenuAmbients = (currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, ambients, handleMenu, setOverLayType) => {

    //reorder ambients based on order property
    (async () => {
        await ambients.sort((a, b) => (a.order > b.order) ? 1 : -1);
    })();

    return ambients.map((amb, index) => {

        return (
            <View key={index}>
                {TabButtonAmbient(currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, amb, handleMenu, index, setOverLayType)}
            </View>
        );

    });
}
export default MenuAmbients;