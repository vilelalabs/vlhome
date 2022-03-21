import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



function SingleDeviceOnAmbient({ index, iconName, deviceName, deviceStatus }) {
    return (    
        <View key={index} style={styles.container}>
            <View style={styles.firstLine}>
                <Icon name={iconName} size={18} color={'#F9943B'} />
                <Text style={styles.text}> {deviceName}</Text>
            </View>
            <View style={styles.statusView}>
                <Text style={styles.textStatus}>STATUS:</Text>
                <Text style={styles.text}>{deviceStatus}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(0,0,0)',
        borderRadius: 10,
        height: 100,
        width: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '5%',

    },
    text: {
        fontSize: 14,
        color: 'rgb(255,255,255)',
        textAlign: 'left'
    },
    textStatus: {
        fontSize: 14,
        color: 'rgb(255,255,255)',
        textAlign: 'left',
    },
    firstLine: {
        display: 'flex',
        flexDirection: 'row',
    },
    statusView: {
        alignItems: 'center',
    },
});

export default SingleDeviceOnAmbient