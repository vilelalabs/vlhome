import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import database from '@react-native-firebase/database';



function SingleDeviceOnAmbient({ index, iconName, deviceName, deviceStatus }) {

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

    async function handleClick() {
        let dbRef = database().ref(`${device}/`);
        setValue(value == "0" ? "1" : "0");
        dbRef.update({ "value": value == "0" ? "1" : "0" });
        console.log(`novo valor: ${value} no device ${deviceName}`);
    
      }

    return (
        <TouchableOpacity
            onPress={handleClick}
        >
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
        </TouchableOpacity>

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