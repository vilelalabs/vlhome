import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

const TabButtonConfig = (currentTab, setCurrentTab, handleClick, setOverLayType) => {
    return (
        <TouchableOpacity
            onPress={() => {
                handleClick();
                setCurrentTab('Configurações');
                setOverLayType('config');
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == 'Configurações' ? foregroundAreaColor : 'transparent',
                paddingLeft: 13,
                paddingRight: 30,
                borderRadius: 8,
                marginTop: 10
            }}>
                <Icon
                    name={'cog'}
                    size={25}
                    color={currentTab == 'Configurações' ? backgroundAreaColor : foregroundAreaColor}
                />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: currentTab == 'Configurações' ? backgroundAreaColor : foregroundAreaColor,
                    paddingLeft: 15,
                }}>{'Configurações'}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default TabButtonConfig;