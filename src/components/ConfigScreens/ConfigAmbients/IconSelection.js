import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


import IconButton from './IconButton';

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';


function IconSelection({ setAmbientIcon }) {
    return (
        <View style={styles.container}>
            <IconButton iconName='lightbulb' setAmbientIcon={setAmbientIcon} />
            <IconButton iconName='garage' setAmbientIcon={setAmbientIcon} />
            <IconButton iconName='car' setAmbientIcon={setAmbientIcon} />
            <IconButton iconName='bed' setAmbientIcon={setAmbientIcon} />
            <IconButton iconName='sofa-single' setAmbientIcon={setAmbientIcon} />
            <IconButton iconName='shower-head' setAmbientIcon={setAmbientIcon} />
            <IconButton iconName='table-furniture' setAmbientIcon={setAmbientIcon} />
            <IconButton iconName='fridge' setAmbientIcon={setAmbientIcon} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    iconButton: {
        marginTop: 20,
        margin: 10,
        padding: 5,
        height: 75,
        width: 75,
        borderRadius: 5,
        backgroundColor: backgroundAreaColor,
        alignItems: 'center',
        justifyContent: 'center',


    },

});



export default IconSelection;