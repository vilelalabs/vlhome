import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import MOptionsAmbient from '../MOptionsAmbient';

function ConfigNewDeviceScreen({ ambients }) {

    const [deviceFound, setDeviceFound] = React.useState(true);
    const [deviceIP, setDeviceIP] = React.useState('');
    const [deviceAmbient, setDeviceAmbient] = React.useState('');
    const [deviceName, setDeviceName] = React.useState('');

    return (
        <View>
            <View style={styles.leftContent}>
                <Icon name={'plus-circle'} size={24} color={'#FFF'} />
                <Text style={styles.titleText}>  Adicionar Novo Dispositivo </Text>
                <Icon name={'chevron-right'} size={24} color={'#FFF'} />
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {
                        // IP será encontrado durante a busca do dispositivo no banco de de dados
                        setDeviceIP('192.168.1.150'); // incluir device.ip futuramente
                    }}>
                        <View style={styles.button}>
                            <Icon name={deviceFound ? 'checkbox-marked-circle' : 'magnify'} size={28} color={'#F9943B'} />
                            <Text style={styles.buttonText}>{deviceFound ? `Dispositivo Encontrado!` : `Buscar Novo Dispositivo`}</Text>
                        </View>
                    </TouchableOpacity>
                    <Menu renderer={renderers.SlideInMenu}>
                        <MenuTrigger disabled={!deviceFound}>
                            <View style={styles.button}>
                                <Icon name={'dots-horizontal-circle-outline'} size={28} color={'#F9943B'} />
                                <Text style={styles.buttonText}>Selecionar Ambientes</Text>
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            <MOptionsAmbient
                                ambients={ambients}
                                setDeviceAmbient={setDeviceAmbient}
                            />
                        </MenuOptions>
                    </Menu>

                    <View style={styles.button}>
                        <Icon name={'pencil'} size={28} color={'#F9943B'} />
                        <TextInput
                            editable={deviceAmbient != ''}
                            style={styles.buttonText}
                            onChangeText={deviceName => setDeviceName(deviceName)}
                            placeholderTextColor='#722004'
                            placeholder={'Definir Nome do Dispositivo'}
                        />
                    </View>
                </View>
                <View style={styles.resume}>
                    {deviceFound && <Text style={styles.resumeTitle}>Resumo...</Text>}
                    {deviceIP != '' && <Text style={styles.resumeText}>IP: {deviceIP}</Text>}
                    {deviceAmbient != '' && <Text style={styles.resumeText}>Ambiente: {deviceAmbient}</Text>}
                    {deviceName != '' && <Text style={styles.resumeText}>Nome: {deviceName}</Text>}
                </View>
            </View>
            <View>
                <TouchableOpacity disabled={deviceName == ''} onPress={() => {
                    //do things...
                    alert('Dispositivo Adicionado com Sucesso!');
                }}>
                    <View style={styles.buttonConfirm}>
                        <Icon name={'plus-circle'} size={28} color={'#F9943B'} />
                        <Text style={styles.buttonText}>{'Adicionar'}</Text>
                    </View>
                </TouchableOpacity>
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
        fontSize: 24,
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
    resume: {
        marginTop: 50,
        paddingLeft: 10,
        flexDirection: 'column',
        marginBottom: 90,
    },
    resumeTitle: {
        marginTop: 10,
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    resumeText: {
        marginTop: 10,
        color: '#FFF',
        fontSize: 18,
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


export default ConfigNewDeviceScreen;