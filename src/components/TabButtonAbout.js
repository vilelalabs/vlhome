import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

const TabButtonAbout = (currentTab, setCurrentTab, handleClick, setOverLayType) => {
    return (
        <TouchableOpacity
            onPress={() => {
                handleClick();
                setCurrentTab('About');
                setOverLayType('about');
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == 'Sobre' ? foregroundAreaColor : 'transparent',
                paddingLeft: 13,
                paddingRight: 30,
                borderRadius: 8,
                marginTop: 10
            }}>
                <Icon
                    name={'information'}
                    size={25}
                    color={currentTab == 'Sobre' ? backgroundAreaColor : foregroundAreaColor}
                />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: currentTab == 'Sobre' ? backgroundAreaColor : foregroundAreaColor,
                    paddingLeft: 15,
                }}>{'Sobre'}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default TabButtonAbout;