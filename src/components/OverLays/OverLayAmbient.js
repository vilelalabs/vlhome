import React from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderAmbientName from '../HeaderAmbientName';
import AmbientDevices from '../AmbientDevices';

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

const OverLayAmbient = (allAmbients,
    ambient, handleClick, showMenu,
    scaleValue, offsetValue, closeButtonOffset) => {

    return (
        <Animated.View style={{
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
            borderRadius: showMenu ? 15 : 0,
            //Transforming the view...
            transform: [
                { scale: scaleValue },
                { translateX: offsetValue }
            ]
        }}>

            {/*Menu Button...*/}
            <Animated.View style={{
                transform: [{
                    translateY: closeButtonOffset
                }]
            }}>
                <TouchableOpacity onPress={() => {
                    handleClick();
                }} >
                    <Icon
                        name={showMenu ? "arrow-left" : "menu"}
                        size={30}
                        color={backgroundAreaColor}
                        style={{ marginTop: 40 }}
                    />

                </TouchableOpacity>

                <HeaderAmbientName
                    ambient={ambient}
                />
                <AmbientDevices
                    allAmbients={allAmbients}
                    ambient={ambient}
                />

            </Animated.View>
        </Animated.View>
    )
}

export default OverLayAmbient;