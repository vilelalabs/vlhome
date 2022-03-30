/*
*
*
*
*/
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import database from '@react-native-firebase/database';




function App() {

  const [device, setDevice] = useState("lampadaQuarto");
  const [value, setValue] = useState();
  const [ipAddress, setIpAddress] = useState();

  
  useEffect(() => {
    const interval = setInterval(async () => {
      let dbRef = database().ref(`${device}/`);
      dbRef.on("value", dataSnapshot => {
        setValue(dataSnapshot.val().value);
        setIpAddress(dataSnapshot.val().ipAddress);
        //console.log("value:", value);
      });

    }, 2000);
    return () => clearInterval(interval);
  }, [value]);

  async function handleClick() {
    let dbRef = database().ref(`${device}/`);
    setValue(value == "0" ? "1" : "0");
    dbRef.update({ "value": value == "0" ? "1" : "0" });
    console.log(value);

  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.sectionTitle}> Teste de acesso à Firebase</Text>
          <Button title="Teste" onPress={() => { handleClick() }} />
          <Text style={styles.highlight}>Estado do LED - {value == "1" ? "LIGADO" : "DESLIGADO"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default App;


/* Additional firebase commands/functions

    // ************** acesso pelo Firebase -  ***********
    let dbRef = database().ref(`${'ambients/0/devices/0'}/`);
    dbRef.on("value", dataSnapshot => {
      (dataSnapshot.val().value === "1") ? allDevices[0].value = "Acesa" : allDevices[0].value = "Apagada";
    })

*/

/*useEffect(() => {
        const interval = setInterval(async () => {
            let dbRef = database().ref(`${device}/`);
            dbRef.on("value", dataSnapshot => {
                setValue(dataSnapshot.val().value);
                setIpAddress(dataSnapshot.val().ipAddress);
                //console.log("value:", value);
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [value]);*/
