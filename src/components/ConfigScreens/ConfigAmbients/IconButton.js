import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';


function IconButton({ iconName, setAmbientIcon }) {
    return (
        <TouchableOpacity
            style={styles.iconButton}
            onPress={() => { setAmbientIcon(iconName); }}
        >
            <Icon name={iconName} size={50} color={foregroundAreaColor} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        marginTop: 20,
        margin: 10,
        padding: 5,
        height: 60,
        width: 60,
        borderRadius: 5,
        backgroundColor: backgroundAreaColor,
        alignItems: 'center',
        justifyContent: 'center',


    },

});

export default IconButton;