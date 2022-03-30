

import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function HeaderAmbientName({ ambient }) {

    return (
        <View
            style={styles.container}
        >
            <View style={styles.leftContent}>
                <Icon name={ambient.iconName} size={28} color={'#FFF'} />
                <Text style={styles.text}>  {ambient.name} </Text>
                <Icon name={'chevron-right'} size={28} color={'#FFF'} />
            </View>
            <Icon />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: '2%',
        marginRight: '2%',
        height: 44,
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'center',
    },
    leftContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',


    },
    rightContent: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    text: {
        color: '#FFF',
        fontSize: 28,
        //fontFamily: 'Montserrat-Regular',
    }
});

module.exports = HeaderAmbientName;