import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewNativeComponent from 'react-native/Libraries/Components/View/ViewNativeComponent';


function AboutScreen({ setOverLayType, showMenuState }) {


    return (
        <View>
            <View style={styles.leftContent}>
                <Icon name={'information'} size={28} color={'#FFF'} />
                <Text style={styles.titleText}>  Sobre </Text>
                <Icon name={'chevron-right'} size={28} color={'#FFF'} />
            </View>
            <View style={styles.container}>
                <View style={styles.upperView}>
                    <TouchableOpacity
                        onPress={() => {
                            alert('Precisa mesmo de um botão aqui?');
                        }}>
                        <View style={styles.link}>
                            <Icon name={'information'} size={28} color={'#F9943B'} />
                            <Text style={styles.buttonText}>{'Desenv. por: Vilela Labs'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            alert('Easter egg ???');
                        }}>
                        <View style={styles.link}>
                            <Icon name={'information'} size={28} color={'#F9943B'} />
                            <Text style={styles.buttonText}>{'Versão:  0.0.1'}</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            alert('Ir para... hvilela.com/engenharia/iothome/termosecondições');
                        }}>
                        <View style={styles.link}>
                            <Icon name={'information'} size={28} color={'#F9943B'} />
                            <Text style={styles.buttonText}>{'Termos e Condições'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            alert('⭐ React Native\n' +
                                '⭐ NodeJS\n' +
                                '⭐ PlatformIO\n' +
                                '⭐ ');
                        }}>
                        <View style={styles.link}>
                            <Icon name={'information'} size={28} color={'#F9943B'} />
                            <Text style={styles.buttonText}>{'Ir para... hvilela.com/engenharia/iothome/tecnologiasedesenvolvimento'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity
                        onPress={() => {
                            alert('Ir para... hvilela.com/engenharia/iothome/ajuda');
                        }}>
                        <View style={styles.button}>
                            <Icon name={'information'} size={28} color={'#F9943B'} />
                            <Text style={styles.buttonText}>{'Ajuda'}</Text>
                        </View>
                    </TouchableOpacity>
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
    container: {
        marginTop: 20,
        marginLeft: '2%',
        marginRight: '2%',
    },
    upperView: {
        paddingTop: 10,
        backgroundColor: '#000',
        borderRadius: 10,
        height: 200,
    },
    link: {
        paddingLeft: 10,
        flexDirection: 'row',
        marginTop: 10,
        height: 30,
        width: 350,
    },
    button: {
        backgroundColor: '#000000',
        borderRadius: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 25,
        height: 50,
        width: 350,
    },
    buttonText: {
        color: '#F9943B',
        fontSize: 24,
        marginLeft: 10,
    },
    configMenu: {
        marginTop: 20,
        marginLeft: '2%',
        marginRight: '2%',
        display: 'flex',
        flexDirection: 'column',
    },

});



export default AboutScreen;