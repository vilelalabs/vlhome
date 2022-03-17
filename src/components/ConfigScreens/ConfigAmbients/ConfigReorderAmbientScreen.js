import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ReorderList from './ReorderList';

function ConfigReorderAmbientScreen({ ambients }) {

    return (
        <View>
            <View style={styles.leftContent}>
                <Icon name={'plus-circle'} size={24} color={'#FFF'} />
                <Text style={styles.titleText}>  Reordenar Lista de Ambientes </Text>
                <Icon name={'chevron-right'} size={24} color={'#FFF'} />
            </View>
            <View style={{height:550, marginBottom: 20}} >
                <ReorderList
                    ambients={ambients}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    leftContent: {
        marginTop: 20,
        marginLeft: '2%',
        marginRight: '2%',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleText: {
        color: '#FFF',
        fontSize: 21,
    },
    button: {
        backgroundColor: '#000000',
        borderRadius: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 15,
        height: 50,
        width: 350,
    },
    buttonText: {
        color: '#F9943B',
        fontSize: 22,
        marginLeft: 10,
    },
    buttonContainer: {
        marginTop: 20,
        marginLeft: '2%',
        marginRight: '2%',
        display: 'flex',
        flexDirection: 'column',

    }, menu: {
        color: '#FFF',
        backgroundColor: "#F00",
        fontSize: 28,
    },
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
    reorderList: {
        marginTop: 50,
        paddingLeft: 10,
        flexDirection: 'column',
        marginBottom: 90,
    },
    buttonConfirm: {
        backgroundColor: '#000000',
        borderRadius: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        height: 50,
        width: 350,
    },
});


export default ConfigReorderAmbientScreen;