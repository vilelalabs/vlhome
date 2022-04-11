import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';

import SaveFile from '../../../services/SaveFile';

import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import MOptionsAmbient from '../MOptionsAmbient';

function ConfigNewDeviceScreen({ ambients }) {

    const [deviceFound, setDeviceFound] = React.useState(false);
    const [newDevice, setNewDevice] = React.useState({});
    const [deviceIP, setDeviceIP] = React.useState('');
    const [selectedAmbient, setSelectedAmbient] = React.useState({});
    const [deviceName, setDeviceName] = React.useState('');

    async function searchDevice() {
        let fb_allDevices;
        //receber todos dispositivos do firebase em um novo array
        const response = await axios.get('https://testeesp8266-ef2ce-default-rtdb.firebaseio.com/.json');
        if (response.data) {
            fb_allDevices = response.data.devices;
        }

        let fb_allDevicesIps = [];
        fb_allDevices.forEach(element => {
            fb_allDevicesIps.push(element.ipAddress);
        });
        let deviceIps = [];
        ambients.forEach(amb => {
            amb.devices.forEach(dev => {
                deviceIps.push(dev.ipAddress);
            });
        });

        //get the difference between the two arrays
        let newIp = fb_allDevicesIps.filter(x => !deviceIps.includes(x));
        console.log(newIp);
        return newIp;
    }

    return (
        <View>
            <View style={styles.leftContent}>
                <Icon name={'plus-circle'} size={24} color={'#FFF'} />
                <Text style={styles.titleText}>  Adicionar Novo Dispositivo </Text>
                <Icon name={'chevron-right'} size={24} color={'#FFF'} />
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={async () => {

                        const ipAddress = await searchDevice();
                        if (ipAddress.length > 0) {
                            console.log(`ipAddress: ${ipAddress}`);
                            setDeviceIP(ipAddress);
                            setDeviceFound(true);
                        }
                        else {
                            setDeviceFound(false);
                            alert('Não há novos dispositivos disponíveis');
                        }
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
                                setDeviceAmbient={setSelectedAmbient}
                            />
                        </MenuOptions>
                    </Menu>

                    <View style={styles.button}>
                        <Icon name={'pencil'} size={28} color={'#F9943B'} />
                        <TextInput
                            editable={Object.keys(selectedAmbient).length !== 0}
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
                    {Object.keys(selectedAmbient).length !== 0 && <Text style={styles.resumeText}>Ambiente: {selectedAmbient.name}</Text>}
                    {deviceName != '' && <Text style={styles.resumeText}>Nome: {deviceName}</Text>}
                </View>
            </View>
            <View>
                <TouchableOpacity disabled={deviceName == ''} onPress={async () => {

                    //percorrer todos os devices no firebase e econtrar o que teve o IP isolado
                    let fb_allDevices;
                    let newDev;

                    const response = await axios.get('https://testeesp8266-ef2ce-default-rtdb.firebaseio.com/.json');
                    if (response.data) {
                        fb_allDevices = response.data.devices;
                    }
                    fb_allDevices.forEach(element => {
                        if (element.ipAddress == deviceIP) {
                            newDev = element;
                        }
                    });

                    let orderCount = 0;
                    selectedAmbient.devices.forEach(dev => {
                        orderCount++;
                    });

                    newDev.name = deviceName;
                    newDev.iconName = 'lightbulb';
                    newDev.order = orderCount;
                    setNewDevice(newDev);

                    selectedAmbient.devices.push(newDev);
                    SaveFile(ambients);
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