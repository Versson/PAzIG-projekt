import React, { useLayoutEffect, useState } from 'react';
import {
  StyleSheet, ScrollView, Text, View, Image, SafeAreaView, TouchableOpacity,
  Platform,
  Dimensions, TextInput, KeyboardAvoidingView, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons'; // to do ikonki  głośnika
import Icon from 'react-native-vector-icons/FontAwesome'; // to do kalendarza i w sumie do domku
import IonIcon from 'react-native-vector-icons/Ionicons'; // do tabletki
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const Add_Med_Screen_2 = () => {  // albo w tym route?

  const navigation = useNavigation();
  const route = useRoute();
  const { nazwa, typLeku, komentarz, manufacturer, dosage } = route.params;
  // const [producent, setManufacturer] = useState('');
  //const [dosage, setDosage] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');



  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate || date);
  };

  const handleTimeChange = (event, selectedTime) => {
    setTime(selectedTime || time);
  };

  /* const [data, setData] = useState({
     nazwa: nazwa || '',
     typLeku: typLeku || '',
     komentarz: komentarz || '',});*/




  const handleAddMed = async () => {
    try {
      // console.log('tekst');
      const nazwaValue = nazwa || '';
      const typLekuValue = typLeku || '';
      const komentarzValue = komentarz || '';
      const manufacturerValue = manufacturer || '';
      const dosageValue = dosage || '';
      const dateValue = date;
      const timeValue = time;

      console.log(nazwa, typLeku, komentarz, manufacturer, dosage, date, time);
      const data = {
        nazwa: nazwaValue,
        typLeku: typLekuValue,
        komentarz: komentarzValue,
        manufacturer: manufacturerValue,
        dosage: dosageValue,
        dateValue: date,
        timeValue: time,
      };


      axios.post("http://192.168.0.53:8000/Add_Med_Screen_2", data)
        .then((response) => {
          console.log("RESP", response);
          Alert.alert('Dodano Leki');
        })
        .catch((err) => console.log("ERR", err));







      Alert.alert('Lek został dodany do bazy danych.');
      navigation.navigate('Main_Screen');
    } catch (error) {
      console.error(error);
      Alert.alert('Wystąpił błąd podczas dodawania leku');
    }
  };


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

      }}>


      <AddText />

      <SafeAreaView style={{ flex: 1 }}>
        <DateTimePickerScreen date={date}
          setDate={setDate}
          time={time}
          setTime={setTime} />
      </SafeAreaView>

      <NextButton navigation={navigation} onPress={handleAddMed} />
      <DolnyPanel />
      <HomeIcon navigation={navigation} />
      <PillIcon navigation={navigation} />
      <HeadIcon navigation={navigation} />
    </View>

  );
};



/*const NotificationIcon = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Notification_Screen")}>
      <View style={{ top: '270%', left: '5%' }}>
        <IonIcon name="notifications" size={30} color="#24CCCC" />
        <Text style={{ position: 'absolute', top: -5, right: -10, backgroundColor: 'red', borderRadius: 8, width: 16, height: 16, textAlign: 'center', color: 'white', fontSize: 12 }}>1</Text>
      </View>
    </TouchableOpacity>
  );
};

const Speaker = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SoundSwitch")}>
      <View style={styles.volumeDownContainer}>
        <View style={styles.volumeDownIcon}>
          <AntDesign name="sound" size={24} color="rgba(98, 243, 243, 1)" />
        </View>
      </View>
    </TouchableOpacity>
  );
}*/

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

const AddText = () => {
  return (
    <Animatable.View animation="fadeIn" easing="ease-in-out" style={{ position: 'absolute', bottom: '86%', left: 0, right: 0 }}>
      <Text style={{ color: '#fff', fontSize: 32, fontFamily: 'Helvetica-Bold', lineHeight: 46, textAlign: 'center' }}>Dodaj lek</Text>
    </Animatable.View>
  );
};


const DateTimePickerScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    setDate(selectedDate || date);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      return newDate;
    });
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={stylesDTP.container}>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={stylesDTP.label}>Wybierz datę</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display="default"
          onChange={handleDateChange}
          style={stylesDTP.datePickerContainer}
          textColor={'white'}
        />
      )}
      <TouchableOpacity onPress={showTimepicker}>
        <Text style={stylesDTP.label}>Wybierz godzinę</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={date}
          mode={'time'}
          display="default"
          onChange={handleTimeChange}
          style={stylesDTP.timePickerContainer}
          textColor={'white'}
        />
      )}
    </View>
  );
};

const stylesDTP = StyleSheet.create({
  container: {
    backgroundColor: '#2F4F4F',
    width: '80%', // ustawiamy szerokość na 80%
    height: '40%', // ustawiamy wysokość na 40%
    alignSelf: 'center', // ustawiamy centrowanie kontenera
    justifyContent: 'center', // ustawiamy wyśrodkowanie zawartości w kontenerze
    alignItems: 'center',
    marginTop: 150,

  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  datePickerContainer: {
    backgroundColor: 'transparent',
    width: '80%',
    height: 40,
  },
  timePickerContainer: {
    backgroundColor: 'transparent',
    width: '80%',
    height: 40,
  },
});



const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={stylesNB.container} >
        <Text style={stylesNB.text}>Zatwierdź</Text>
      </View>
    </TouchableOpacity>
  );
}

const stylesNB = StyleSheet.create({
  container: {
    backgroundColor: '#24CCCC',
    width: 129,
    height: 45,
    position: 'absolute',
    top: -70,
    left: 149,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 19,
    textAlign: 'center',
    paddingTop: 8,
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
    top: '9%',
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
    bottom: '-35%',
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
      <View style={{ bottom: '65%', left: '45%' }}>
        <MIcon name="pill" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
};

const HeadIcon = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile_Screen")}>
      <View style={{ bottom: '170%', left: '80%' }}>
        <MIcon name="head" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
};



export default Add_Med_Screen_2