import React from 'react'
import { View } from 'react-native'
import TabButtonAmbient from './TabButtonAmbient';


const MenuAmbients = (currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, ambients, handleMenu, setOverLayType) => {

    //reorder ambients based on order property
    ambients.sort((a, b) => (a.order > b.order) ? 1 : -1);

    return ambients.map((amb, index) => {

        return (
            <View key={index}>
                {TabButtonAmbient(currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, amb, handleMenu, index, setOverLayType)}
            </View>
        );

    });
}
export default MenuAmbients;