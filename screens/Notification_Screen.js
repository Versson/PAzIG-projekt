import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons'; // to do ikonki  głośnika
import Icon from 'react-native-vector-icons/FontAwesome'; // to do kalendarza i w sumie do domku
import IonIcon from 'react-native-vector-icons/Ionicons'; // do tabletki
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendPushNotification, createLocalNotification } from '../Notifications/PushNotifications'; // Import funkcji sendPushNotification


const Notification_Screen = () => {

  const navigation = useNavigation();
  const [nazwaLeku, setNazwaLeku] = useState('');
  const [trescPowiadomienia, setTrescPowiadomienia] = useState('');
  const [czasPowiadomienia, setCzasPowiadomienia] = useState('');
  const [notificationData, setNotificationData] = useState(null); // Dodaj stan dla danych powiadomienia
  const [medicineType, setMedicineType] = useState('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Przykładowe użycie

  //const time = '2023-06-11T21:00:00'; // Określona godzina

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []); // tu się w sumie usuwa nagłowek

  const handleNotification = async () => {
    // Przygotowanie danych powiadomienia
    const notification = {
      title: nazwaLeku,
      body: trescPowiadomienia,
      // Dodaj inne pola powiadomienia
      time: czasPowiadomienia,
      sound: 'default',
      vibrate: [0, 250, 250, 250],
    };

    // Wywołanie funkcji do tworzenia lokalnego powiadomienia
    createLocalNotification(notification.title, notification.body, notification.time, medicineType);
    console.log(notification);
    setNotificationData(notification); // Ustawienie danych powiadomienia w stanie
    Alert.alert('Dodano przypomnienie Push!')
  };

  const handleNotificationButtonPress = () => {
    createLocalNotification("Nowe powiadomienie", "To jest treść powiadomienia");
  };

  const handleCurrentTimeButtonPress = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    setCzasPowiadomienia(currentTime);
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={stylesK.container}>
        <View
          style={{
            width: 428,
            height: 926,
            backgroundColor: '#0C1320',
            borderRadius: 34,
            //backgroundColor: 'rgba(12, 35, 64, 1)',
          }}>
          <TouchableOpacity style={stylesb.button} onPress={handleNotificationButtonPress}>
            <Text style={styles.buttonText}>Testuj powiadomienie</Text>
          </TouchableOpacity>
          <NotificationIcon />
          <Speaker />
          <ProfilText />
          <TypLekuText />
          <Text style={stylesm.label}></Text>
          <TouchableOpacity style={stylesm.input} onPress={togglePicker}>
            <Text style={stylesm.inputText}>{medicineType}</Text>
          </TouchableOpacity>
          <Modal visible={isPickerVisible} animationType="slide" transparent>
            <View style={stylesm.modalContainer}>
              <View style={stylesm.modalContent}>
                <Picker
                  selectedValue={medicineType}
                  onValueChange={(itemValue) => {
                    setMedicineType(itemValue);
                    setIsPickerVisible(false);
                  }}
                >
                  <Picker.Item label="Immunosupresant" value="Immunosupresant" />
                  <Picker.Item label="Przeciwbólowe" value="Przeciwbólowe" />
                  <Picker.Item label="Antybiotyk" value="Antybiotyk" />
                  <Picker.Item label="Antykoncepcyjne" value="Antykoncepcyjne" />
                  <Picker.Item label="Przeciwzapalne" value="Przeciwzapalne" />
                  <Picker.Item label="Przeciwwirusowe" value="Przeciwwirusowe" />
                  <Picker.Item label="Przeciwnadciśnieniowe" value="Przeciwnadciśnieniowe" />
                  <Picker.Item label="Przeciwdepresyjne" value="Przeciwdepresyjne" />
                  <Picker.Item label="Przeciwhistaminowe" value="Przeciwhistaminowe" />
                </Picker>
              </View>
            </View>
          </Modal>
          <NazwaLekuText />
          <NazwaLekuBox value={nazwaLeku} onChangeText={setNazwaLeku} />
          <TreśćText />
          <TreśćBox value={trescPowiadomienia} onChangeText={setTrescPowiadomienia} />
          <TimeText />
          <TimeBox value={czasPowiadomienia} onChangeText={setCzasPowiadomienia} />
          <TouchableOpacity style={stylesKk.timeButton} onPress={handleCurrentTimeButtonPress}>
            <Text style={stylesTB.timeButtonText}>Aktualna data i godzina</Text>
          </TouchableOpacity>
          <NextButton navigation={navigation} onPress={handleNotification} />
          <DolnyPanel />
          <HomeIcon navigation={navigation} />
          <PillIcon navigation={navigation} />
          <HeadIcon navigation={navigation} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const stylesm = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 75,
  },
  input: {
    backgroundColor: '#3D4754',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  inputText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '80%',

  },
});

const stylesKk = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C1320',
  },
  notificationContainer: {
    width: 428,
    height: 926,
    backgroundColor: '#0C1320',
    borderRadius: 34,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#5374FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1B2430',
    borderRadius: 10,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    flex: 1,
    backgroundColor: '#1B2430',
    borderRadius: 10,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  timeButton: {
    backgroundColor: '#5374FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    top: 400,
  },
  timeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#5374FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const NotificationIcon = () => {
  return (
    <TouchableOpacity>
      <View style={{ top: '95%', left: '5%' }}>
        <IonIcon name="notifications" size={30} color="#fff" />
        <Text style={{ position: 'absolute', top: -5, right: -10, backgroundColor: 'red', borderRadius: 8, width: 16, height: 16, textAlign: 'center', color: 'white', fontSize: 12 }}>1</Text>
      </View>
    </TouchableOpacity>
  );
};

const Speaker = () => {
  return (
    <TouchableOpacity>
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
    top: 5,
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
    <Animatable.View animation="fadeIn" easing="ease-in-out" style={{ position: 'absolute', bottom: '89%', left: 0, right: 0 }}>
      <Text style={{ color: '#fff', fontSize: 32, fontFamily: 'Helvetica-Bold', lineHeight: 46, textAlign: 'center' }}>Ustaw powiadomienie</Text>
    </Animatable.View>
  );
};

const TypLekuText = () => {
  return (
    <View style={stylesTL.container}>
      <Text style={stylesTL.text}>
        Wybierz typ leku
      </Text>
    </View>
  );
}

const stylesTL = StyleSheet.create({
  container: {
    backgroundColor: '#0C1320',
    width: 299,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '15%',
    left: '15%',
  },
  text: {
    color: '#fff',
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
  },
});

const NazwaLekuText = () => {
  return (
    <View style={stylesT.container}>
      <Text style={stylesT.text}>
        Nazwa leku
      </Text>
    </View>
  );
}

const stylesT = StyleSheet.create({
  container: {
    backgroundColor: '#0C1320',
    width: 299,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '25%',
    left: '15%',
  },
  text: {
    color: '#fff',
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
  },
});

//nazwa leku do powiadominia
const NazwaLekuBox = ({ value, onChangeText }) => {
  const [selectedValue, setSelectedValue] = useState();

  return (
    <View style={stylesW.container}>
      <View style={stylesW.background} />
      <View style={stylesW.stroke} />
      <TextInput
        style={[stylesW.input, { width: 378, height: 65 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Wpisz tutaj..."
        placeholderTextColor="white"
      />


    </View>
  );
};

const stylesW = StyleSheet.create({
  container: {
    //  backgroundColor: 'white',
    backgroundColor: '#0C1F37',
    width: 378,
    height: 63,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#62F0F0',
    overflow: 'hidden',
    position: 'absolute',
    top: '30%',
    left: '5%',
  },
  background: {
    backgroundColor: '#0C1F37',
    flex: 1,
  },
  stroke: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#62F0F0',
  },
  input: {
    color: 'white',
    backgroundColor: '#0C1F37',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },
});

const TreśćText = () => {
  return (
    <View style={stylesTT.container}>
      <Text style={stylesTT.text}>
        Treść powiadomienia
      </Text>
    </View>
  );
}

const stylesTT = StyleSheet.create({
  container: {
    backgroundColor: '#0C1320',
    width: 299,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '39%',
    left: '15%',
  },
  text: {
    color: '#fff',
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
  },
});
// treść powiadomienia
const TreśćBox = ({ value, onChangeText }) => {
  // const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={stylesTB.container}>
      <View style={stylesTB.background} />
      <View style={stylesTB.stroke} />
      <TextInput
        style={[stylesTB.input, { width: 378, height: 65 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Wpisz tutaj..."
        placeholderTextColor="white"
      />

    </View>
  );
}

const stylesTB = StyleSheet.create({
  container: {
    backgroundColor: '#0C1F37',
    width: 378,
    height: 63,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#62F0F0',
    overflow: 'hidden',
    position: 'absolute',
    top: '44%',
    left: '5%',

  },
  background: {
    backgroundColor: '#0C1F37',
    flex: 1,
  },
  stroke: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#62F0F0',
  },
  input: {
    color: 'white',
    backgroundColor: '#0C1F37',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },


});

const TimeText = () => {
  return (
    <View style={stylesDT.container}>
      <Text style={stylesDT.text}>
        Czas
      </Text>
    </View>
  );
}

const stylesDT = StyleSheet.create({
  container: {
    backgroundColor: '#0C1320',
    width: 299,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '53%',
    left: '15%',
  },
  text: {
    color: '#fff',
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
  },
});
// czas na wywołanie przypomnienia
const TimeBox = ({ value, onChangeText }) => {
  // const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={stylesDB.container}>
      <View style={stylesDB.background} />
      <View style={stylesDB.stroke} />
      <TextInput
        style={[stylesDB.input, { width: 378, height: 65 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Wpisz tutaj..."
        placeholderTextColor="white"
      />

    </View>
  );
}

const stylesDB = StyleSheet.create({
  container: {
    backgroundColor: '#0C1F37',
    width: 378,
    height: 63,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#62F0F0',
    overflow: 'hidden',
    position: 'absolute',
    top: '58%',
    left: '5%',

  },
  background: {
    backgroundColor: '#0C1F37',
    flex: 1,
  },
  stroke: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#62F0F0',
  },
  input: {
    color: 'white',
    backgroundColor: '#0C1F37',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },


});



const NextButton = ({ navigation, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={stylesNB.container}>
        <Text style={stylesNB.text}>Zatwierdź</Text>
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
    top: 450,
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
    top: '63%',
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
    bottom: '-1250%',
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
      <View style={{ bottom: '-1550%', left: '45%' }}>
        <MIcon name="pill" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
};

const HeadIcon = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profil_Screen")}>
      <View style={{ bottom: '-1450%', left: '80%' }}>
        <MIcon name="head" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
};

const stylesb = StyleSheet.create({
  container: {
    width: 428,
    height: 926,
    backgroundColor: '#0C1320',
    borderRadius: 34,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#0C1320', /////// tu zmienione
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const stylesK = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#24cccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 16,
  },
  content: {
    width: 428,
    height: 926,
    borderRadius: 34,
  },
  // Reszta styli
});

export default Notification_Screen