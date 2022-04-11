import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    MenuOption,
} from 'react-native-popup-menu';

function MOptionsAmbient({ ambients, setDeviceAmbient }) {

    return ambients.map((amb, index) => {
        return (
            <MenuOption key={index} onSelect={() => {
                setDeviceAmbient(amb);
            }}>
                <View style={styles.menuOptionWrapper}>
                    <Icon name={amb.iconName} size={28} color={'#000'} />
                    <Text style={styles.menuOptionText}>{amb.name}</Text>
                </View>
            </MenuOption>
        );
    });
}

const styles = StyleSheet.create({

    menuOptionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    menuOptionText: {
        color: '#000',
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: "#FFF",
        fontWeight: 'bold',
        marginLeft: 15,
    },

});

export default MOptionsAmbient;