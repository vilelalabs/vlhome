import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Animated } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu';

// import components

import LoadScreen from './src/LoadScreen';

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
import Factory from './src/logic_components/Factory';
import data from './src/logic_components/initData.json';

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

import getData from './getData';

let allAmbients = [];
// carrega ambiente provisório para inicialização não zerada de allAmbients
data.ambients.forEach(amb => {
  allAmbients.push(Factory('ambient', amb.id, amb.iconName, amb.name, amb.devices, amb.order));
});

function App() {

  const [loadScreen, setLoadScreen] = useState(true);
  const [currentAmbient, setCurrentAmbient] = useState(allAmbients[0])

  useEffect(() => {
    (async () => {
      allAmbients = await getData();
      setLoadScreen(false);
      setCurrentAmbient(allAmbients[0]);
    })();
  }, []);


  const [currentTab, setCurrentTab] = useState("Home");

  const [overLayType, setOverLayType] = useState('configNewAmbient'); //set for tests opening this screen first
  const [showMenu, setShowMenu] = useState(false);

  //Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;// initially must be 1
  const closeButtonOffset = useRef(new Animated.Value(0)).current;


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

  if (loadScreen) {
    return (
      <>
        <LoadScreen />
      </>
    )
  }
  else {
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
            OverLayAmbient(allAmbients, currentAmbient, handleMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, setOverLayType)}
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