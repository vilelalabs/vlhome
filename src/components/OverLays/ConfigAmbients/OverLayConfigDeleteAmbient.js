import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfigDeleteAmbientScreen from '../../ConfigScreens/ConfigAmbients/ConfigDeleteAmbientScreen';


const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

const OverLayConfigDeleteAmbient = ( handleClick, ambients) => {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => {
                    handleClick('config');

                }} >
                    <Icon
                        name={"arrow-left"}
                        size={30}
                        color={backgroundAreaColor}
                        style={{ marginTop: 40 }}
                    />
                </TouchableOpacity>

                <ConfigDeleteAmbientScreen
                ambients= {ambients}
                />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        backgroundColor: foregroundAreaColor,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingVertical: 20,
        borderRadius: 0,
    },
});
export default OverLayConfigDeleteAmbient;