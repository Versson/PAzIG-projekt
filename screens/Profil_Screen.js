import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons'; // to do ikonki  głośnika
import Icon from 'react-native-vector-icons/FontAwesome'; // to do kalendarza i w sumie do domku
import IonIcon from 'react-native-vector-icons/Ionicons'; // do tabletki
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const Profil_Screen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []); // tu się w sumie usuwa nagłowek

  return (
    <View
      style={{
        width: 428,
        height: 926,
        backgroundColor: '#0C1320',
        borderRadius: 34,
        //backgroundColor: 'rgba(12, 35, 64, 1)',
      }}>

      <NotificationIcon navigation={navigation} />
      <Speaker navigation={navigation} />
      <ProfilText />

      <NextButton navigation={navigation} />
      <DolnyPanel />
      <HomeIcon navigation={navigation} />
      <PillIcon navigation={navigation} />
      <HeadIcon />
    </View>
  );
};


const NotificationIcon = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Notification_Screen")}>
      <View style={{ top: '270%', left: '5%' }}>
        <IonIcon name="notifications" size={30} color="#24CCCC" />
        <Text style={{ position: 'absolute', top: -5, right: -10, backgroundColor: 'red', borderRadius: 8, width: 16, height: 16, textAlign: 'center', color: 'white', fontSize: 12 }}>1</Text>
      </View>
    </TouchableOpacity>
  );
};

const Speaker = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SoundSwitch")}>
      <View style={styles.volumeDownContainer}>
        <View style={styles.volumeDownIcon}>
          <AntDesign name="sound" size={24} color="rgba(98, 243, 243, 1)" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  volumeDownContainer: {
    position: 'absolute',
    width: 24.811594009399414,
    height: 24.803571701049805,
    top: 55,
    left: '85%',
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotate: '0deg' },
    ],
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  volumeDownIcon: {
    position: 'absolute',
    width: 24.811594009399414,
    height: 24.803585052490234,
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotate: '0deg' },
    ],
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});


const ProfilText = () => {
  return (
    <Animatable.View animation="fadeIn" easing="ease-in-out" style={{ position: 'absolute', bottom: '86%', left: 0, right: 0 }}>
      <Text style={{ color: '#fff', fontSize: 32, fontFamily: 'Helvetica-Bold', lineHeight: 46, textAlign: 'center' }}>Profil</Text>
    </Animatable.View>
  );
};

const NextButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Welcome_Screen")} >
      <View style={stylesNB.container}>
        <Text style={stylesNB.text}>Wyloguj się</Text>
      </View>
    </TouchableOpacity>
  );
}

const stylesNB = StyleSheet.create({
  container: {
    backgroundColor: '#24CCCC',
    width: 200,
    height: 80,
    position: 'absolute',
    top: 600,
    left: 120,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 19,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
});


const DolnyPanel = () => {
  return (
    <View style={stylesDP.container}>
      <View style={stylesDP.shadows}>
        <View style={stylesDP.shadowLayer0} />
      </View>
      <View style={stylesDP.shapes}>
        <View style={stylesDP.shapeLayer1} />
      </View>
    </View>
  );
};

const stylesDP = StyleSheet.create({
  container: {
    height: 100,
    top: '85.5%',
    backgroundColor: '#0C1F32',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 5,
  },
  shadows: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  shadowLayer0: {
    height: 119,
    borderRadius: 0,
    backgroundColor: '#0C1F32',
    transform: [{ scaleY: 1.05 }],
  },
  shapes: {
    flex: 1,
    borderRadius: 0,
    overflow: 'hidden',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  //tutaj mamy styl do ikonki domku
  iconContainer: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: 40,
    height: 40,
    bottom: '-1770%',
    left: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shapeLayer1: {
    height: 119,
    backgroundColor: '#0C1F32',
  },
});

const HomeIcon = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Main_Screen")}>
      <View style={stylesDP.iconContainer}>
        <Icon name="home" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
}

const PillIcon = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MedList_Screen")}>
      <View style={{ bottom: '-2240%', left: '45%' }}>
        <MIcon name="pill" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
};

const HeadIcon = () => {
  return (
    <TouchableOpacity>
      <View style={{ bottom: '-2150%', left: '80%' }}>
        <MIcon name="head" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};



export default Profil_Screen