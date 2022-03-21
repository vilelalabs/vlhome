/*

Teste do exemplo do vídeo: https://www.youtube.com/watch?v=roXoHAP-28g

*/
import React, { useState, useRef } from 'react'
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Animated } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu';

import database from '@react-native-firebase/database'

//self-made components
import TabButtonConfig from './src/components/TabButtonConfig';
import TabButtonAbout from './src/components/TabButtonAbout';

import OverLayAmbient from './src/components/OverLays/OverLayAmbient';
import OverLayConfig from './src/components/OverLays/OverLayConfig';
import OverLayAbout from './src/components/OverLays/OverLayAbout';

import OverLayConfigNewDevice from './src/components/OverLays/ConfigDevices/OverLayConfigNewDevice';
import OverLayConfigEditDevice from './src/components/OverLays/ConfigDevices/OverLayConfigEditDevice';
import OverLayConfigDeleteDevice from './src/components/OverLays/ConfigDevices/OverLayConfigDeleteDevice';

import OverLayConfigNewAmbient from './src/components/OverLays/ConfigAmbients/OverLayConfigNewAmbient';
import OverLayConfigEditAmbient from './src/components/OverLays/ConfigAmbients/OverLayConfigEditAmbient';
import OverLayConfigDeleteAmbient from './src/components/OverLays/ConfigAmbients/OverLayConfigDeleteAmbient';
import OverLayConfigReorderAmbient from './src/components/OverLays/ConfigAmbients/OverLayConfigReorderAmbient';

import MenuAmbients from './src/components/MenuAmbients';
//logic-components
import Ambient from './src/logic_components/Ambient';
import Device from './src/logic_components/Device';

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';



//must be instantiated with information from Firebase , mas será adicionado via app futuramente
dev1 = new Device('lightbulb', 'Lâmpada', "Acesa", 1);
dev2 = new Device('lightbulb', 'Lâmpada', 'Apagada', 2);
dev3 = new Device('fan', 'Ventilador', '50%', 3);
dev4 = new Device('fan', 'Ar Cond.', '23°C', 4);
dev5 = new Device('television', 'Televisão', 'Ligada', 5);
dev6 = new Device('garage', 'Portão', 'Aberto fechando...', 6);
dev7 = new Device('fan', 'Ventilador', '50%', 7);
dev8 = new Device('lightbulb', 'Lâmpada', 'Acesa', 8);
dev9 = new Device('lightbulb', 'Lâmpada', 'Apagada', 9);

// grupo de devices não podem ser compartilhados entre ambientes (!!)
const devices1 = [dev1, dev3, dev4, dev5];
const devices2 = [dev1, dev7, dev5];
const devices3 = [dev1, dev6, dev9];
const devices4 = [dev1, dev8, dev9, dev6];

//must be local saved, or from Firebase (another branch only for 'ambients')
amb1 = new Ambient('bed', 'Quarto Frente', devices1, 0);
amb2 = new Ambient('television', 'Sala', devices2, 1);
amb3 = new Ambient('garage', 'Garagem', devices3, 2);
amb4 = new Ambient('lightbulb', 'Externo', devices4, 3);

allAmbients = [amb1, amb2, amb3, amb4];


function App() {
  const [currentTab, setCurrentTab] = useState("Home");
  const [currentAmbient, setCurrentAmbient] = useState(amb1);
  const [overLayType, setOverLayType] = useState('ambient'); //set for tests opening this screen first
  const [showMenu, setShowMenu] = useState(false);

  //Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;// initially must be 1
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  /************** essa inicialização funcionou, falta ser estruturada */
  let dbRef = database().ref(`${'lampadaQuarto'}/`);
  dbRef.on("value", dataSnapshot => {
    (dataSnapshot.val().value === "1")? dev1.value = "Acesa" : dev1.value = "Apagada";
  })
  /*****************/


  const handleMenu = () => {
    //scaling the view
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true
    }).start();
    //moving the view
    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    //moving the view
    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true
    }).start();

    setShowMenu(!showMenu);
  }

  const changeOverlayType = (type) => {
    setOverLayType(type);
    setShowMenu(false);
  }

  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={styles.menuTitle}>Ambientes</Text>

          <ScrollView style={{ flexGrow: 1, marginTop: 15 }}>
            {MenuAmbients(currentAmbient, setCurrentAmbient, currentTab, setCurrentTab, allAmbients, handleMenu, setOverLayType)}
          </ScrollView>
          <View>
            {TabButtonConfig(currentTab, setCurrentTab, handleMenu, setOverLayType)}
            {TabButtonAbout(currentTab, setCurrentTab, handleMenu, setOverLayType)}
          </View>
        </View>

        {/* Over lays views...*/}
        {(overLayType === 'ambient') &&
          OverLayAmbient(currentAmbient, handleMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, setOverLayType)}
        {(overLayType === 'config') &&
          OverLayConfig(handleMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, setOverLayType)}
        {(overLayType === 'about') &&
          OverLayAbout(handleMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, setOverLayType)}
        {(overLayType === 'configNewDevice') &&
          OverLayConfigNewDevice(changeOverlayType, allAmbients)}
        {(overLayType === 'configEditDevice') &&
          OverLayConfigEditDevice(changeOverlayType, allAmbients)}
        {(overLayType === 'configDeleteDevice') &&
          OverLayConfigDeleteDevice(changeOverlayType, allAmbients)}
        {(overLayType === 'configNewAmbient') &&
          OverLayConfigNewAmbient(changeOverlayType, allAmbients)}
        {(overLayType === 'configEditAmbient') &&
          OverLayConfigEditAmbient(changeOverlayType, allAmbients)}
        {(overLayType === 'configDeleteAmbient') &&
          OverLayConfigDeleteAmbient(changeOverlayType, allAmbients)}
        {(overLayType === 'configReorderAmbient') &&
          OverLayConfigReorderAmbient(changeOverlayType, allAmbients)}
      </SafeAreaView>
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundAreaColor,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 15,
  },
  viewProfile: {
    color: foregroundAreaColor,
  },
  menuTitle: {
    backgroundColor: '#000000',
    borderRadius: 5,
    color: '#F9943B',
    fontSize: 22,
    padding: 5,
    marginTop: 8,
    textAlign: 'center',
  },

});


export default App;