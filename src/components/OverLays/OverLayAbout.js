import React from 'react'
import { Animated, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AboutScreen from '../ConfigScreens/AboutScreen';


const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

const OverLayAbout = (
    handleClick, showMenu,
    scaleValue, offsetValue, closeButtonOffset, setOverLayType) => {
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

                <AboutScreen
                    setOverLayType={setOverLayType}
                    showMenuState={showMenu}
                />

            </Animated.View>
        </Animated.View>
    )
}

export default OverLayAbout;