import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

function ConfigScreen({ setOverLayType, showMenuState }) {


    return (
        <View>
            <View style={styles.leftContent}>
                <Icon name={'cog'} size={28} color={'#FFF'} />
                <Text style={styles.titleText}>  Configurações </Text>
                <Icon name={'chevron-right'} size={28} color={'#FFF'} />
            </View>
            <View style={styles.container}>
                <View style={styles.configMenu}>
                    <Menu renderer={renderers.SlideInMenu}>
                        <MenuTrigger disabled={showMenuState}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>  Dispositivos </Text>
                                <Icon name={'dots-horizontal-circle-outline'} size={28} color={'#F9943B'} />
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => { setOverLayType('configNewDevice'); }}>
                                <View style={styles.menuOptionWrapper}>
                                    <Icon name={'plus-circle'} size={28} color={'#000'} />
                                    <Text style={styles.menuOptionText}>Novo</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => { setOverLayType('configEditDevice'); }}>
                                <View style={styles.menuOptionWrapper}>
                                    <Icon name={'pencil'} size={28} color={'#000'} />
                                    <Text style={styles.menuOptionText}>Editar</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => { setOverLayType('configDeleteDevice'); }}>
                                <View style={styles.menuOptionWrapper}>
                                    <Icon name={'minus-circle'} size={28} color={'#000'} />
                                    <Text style={styles.menuOptionText}>Excluir</Text>
                                </View>
                            </MenuOption>

                        </MenuOptions>
                    </Menu>
                    <Menu renderer={renderers.SlideInMenu} >
                        <MenuTrigger disabled={showMenuState}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>  Ambientes </Text>
                                <Icon name={'dots-horizontal-circle-outline'} size={28} color={'#F9943B'} />
                            </View>
                        </MenuTrigger>

                        <MenuOptions >
                            <MenuOption onSelect={() => { setOverLayType('configNewAmbient'); }}>
                                <View style={styles.menuOptionWrapper}>
                                    <Icon name={'plus-circle'} size={28} color={'#000'} />
                                    <Text style={styles.menuOptionText}>Novo</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => { setOverLayType('configEditAmbient'); }}>
                                <View style={styles.menuOptionWrapper}>
                                    <Icon name={'pencil'} size={28} color={'#000'} />
                                    <Text style={styles.menuOptionText}>Editar</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => { setOverLayType('configDeleteAmbient'); }}>
                                <View style={styles.menuOptionWrapper}>
                                    <Icon name={'minus-circle'} size={28} color={'#000'} />
                                    <Text style={styles.menuOptionText}>Excluir</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => { setOverLayType('configReorderAmbient'); }}>
                                <View style={styles.menuOptionWrapper}>
                                    <Icon name={'menu-swap-outline'} size={28} color={'#000'} />
                                    <Text style={styles.menuOptionText}>Reordenar</Text>
                                </View>
                            </MenuOption>

                        </MenuOptions>

                    </Menu>
                </View>

            </View>
            <View>

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
        fontSize: 28,
        //fontFamily: 'Montserrat-Regular',
    },
    button: {
        backgroundColor: '#000000',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        height: 50,
        width: 350,
    },
    buttonText: {
        color: '#F9943B',
        fontSize: 24,
    },
    configMenu: {
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

});



export default ConfigScreen;