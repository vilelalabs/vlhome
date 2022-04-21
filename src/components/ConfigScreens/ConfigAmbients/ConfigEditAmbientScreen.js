import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SaveFile from '../../../services/SaveFile';

import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

import MOptionsAmbient from '../MOptionsAmbient';

function ConfigEditAmbientScreen({ ambients }) {

    const [ambientName, setAmbientName] = React.useState('');

    const [selectedAmbient, setSelectedAmbient] = React.useState({});
    return (
        <View style={{ paddingBottom: 150 }}>
            <ScrollView>

                <View style={styles.leftContent}>
                    <Icon name={'pencil'} size={24} color={'#FFF'} />
                    <Text style={styles.titleText}>  Editar Ambientes </Text>
                    <Icon name={'chevron-right'} size={24} color={'#FFF'} />
                </View>
                <View>
                    <View style={styles.buttonContainer}>
                        <Menu renderer={renderers.SlideInMenu}>
                            <MenuTrigger >
                                <View style={styles.button}>
                                    <Icon name={'dots-horizontal-circle-outline'} size={28} color={'#F9943B'} />
                                    <Text style={styles.buttonText}>Selecionar Ambiente</Text>
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
                                onChangeText={ambientName => setAmbientName(ambientName)}
                                placeholderTextColor='#722004'
                                placeholder={'Definir Novo Nome...'}
                            />
                        </View>
                    </View>
                    <View style={styles.resume}>
                        {Object.keys(selectedAmbient).length !== 0 && <Text style={styles.resumeTitle}>Resumo...</Text>}

                        {Object.keys(selectedAmbient).length !== 0 && <Text style={styles.resumeText}>Ambiente selecionado: {selectedAmbient.name}</Text>}
                        {ambientName != '' && <Text style={styles.resumeText}>Novo Nome: {ambientName}</Text>}
                    </View>
                </View>
                <View>
                    <TouchableOpacity disabled={ambientName == ''} onPress={() => {
                        selectedAmbient.name = ambientName;
                        SaveFile(ambients);
                        alert('Edições realizadas com sucesso!');
                    }}>
                        <View style={styles.buttonConfirm}>
                            <Icon name={'pencil'} size={28} color={'#F9943B'} />
                            <Text style={styles.buttonText}>{'Confirmar Edição'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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


export default ConfigEditAmbientScreen;