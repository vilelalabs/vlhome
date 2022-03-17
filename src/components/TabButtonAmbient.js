import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

const TabButtonAmbient = (currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, ambient, handleClick, key, setOverLayType) => {
    return (
        <TouchableOpacity
            onPress={() => {
                handleClick();
                setCurrentTab(ambient.name);
                setCurrentAmbient(ambient);
                setOverLayType('ambient');
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == ambient.name ? foregroundAreaColor : 'transparent',
                paddingLeft: 13,
                paddingRight: 30,
                borderRadius: 8,
                marginTop: 10
            }}>
                <Icon
                    name={ambient.iconName}
                    size={25}
                    color={currentTab == ambient.name ? backgroundAreaColor : foregroundAreaColor}
                />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: currentTab == ambient.name ? backgroundAreaColor : foregroundAreaColor,
                    paddingLeft: 15,
                }}>{ambient.name}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default TabButtonAmbient;