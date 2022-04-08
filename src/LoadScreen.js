import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'


const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

function LoadScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Importando dados...</Text>
            <ActivityIndicator style={{
                marginTop: 50,
                transform: [{ scale: 1.5 }]

            }} size={'large'} color="#F9943B" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: foregroundAreaColor
    },
    text: {
        color: backgroundAreaColor,
        fontSize: 32
    }
})
export default LoadScreen;