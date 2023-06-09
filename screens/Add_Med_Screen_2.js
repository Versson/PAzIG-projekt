import React, { useLayoutEffect, useState } from 'react';
import {
  StyleSheet, ScrollView, Text, View, Image, SafeAreaView, TouchableOpacity,
  Platform,
  Dimensions, TextInput, KeyboardAvoidingView
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
  const { nazwa, typLeku, komentarz, producent, dosage } = route.params;
  // const [producent, setManufacturer] = useState('');
  //const [dosage, setDosage] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  /*  const handleProducentChange = (value) => {
      setManufacturer(value);
    };
    const handleDosageChange = (value) => {
      setDosage(value); };*/

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
      const manufacturerValue = producent || '';
      const dosageValue = dosage || '';
      const dateValue = date;
      const timeValue = time;

      console.log(nazwa, typLeku, komentarz, producent, dosage, date, time);
      const data = {
        nazwa: nazwaValue,
        typLeku: typLekuValue,
        komentarz: komentarzValue,
        producent: manufacturerValue,
        dosage: dosageValue,
        dateValue: date,
        timeValue: time,
      };


      axios.post("http://192.168.0.5:8000/Add_Med_Screen_2", data)
        .then((response) => {
          console.log("RESP", response);
          Alert.alert('Dodano Leki');
        })
        .catch((err) => console.log("ERR", err));

      /*  axios.post("http://192.168.0.53:8000/Add_Med_Screen_2", {  //trzeba zmienić za każdym razem bo inaczej się nie połączy Ipv4 adress z komendy ipconfig
          nazwa: nazwaValue,                                      // było 
          typLeku: typLekuValue,
          komentarz: komentarzValue,
          dateValue: date,
          timeValue: time,
        })
          .then((response) => {
            console.log("RESP");
            Alert.alert('Dodano Leki'); // w sumie to nie wiem czemu nie ma komunikatu
          })
          .catch((err) => console.log("ERR", err));*/






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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={stylesK.container}>
        <View
          style={{
            width: 428,
            height: 926,
            backgroundColor: '#0C1320',
            borderRadius: 34,

          }}>

          <NotificationIcon />
          <Speaker />
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
          <PillIcon />
          <HeadIcon />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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

const NotificationIcon = () => {
  return (
    <TouchableOpacity>
      <View style={{ top: '270%', left: '5%' }}>
        <IonIcon name="notifications" size={30} color="#24CCCC" />
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
const DoseText = () => {
  return (
    <View style={stylesT.container}>
      <Text style={stylesT.text}>
        Dawka(mg)
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
    top: '52%',
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

const DoseBox = ({ value, onChangeText }) => {
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
    top: '56%',
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

const ManufacturerText = () => {
  return (
    <View style={stylesMT.container}>
      <Text style={stylesMT.text}>
        Producent
      </Text>
    </View>
  );
}

const stylesMT = StyleSheet.create({
  container: {
    backgroundColor: '#0C1320',
    width: 299,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '64%',
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

const ManufacturerBox = ({ value, onChangeText }) => {
  // const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={stylesMB.container}>
      <View style={stylesMB.background} />
      <View style={stylesMB.stroke} />
      <TextInput
        style={[stylesMB.input, { width: 378, height: 65 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Wpisz tutaj..."
        placeholderTextColor="white"
      />

    </View>
  );
}

const stylesMB = StyleSheet.create({
  container: {
    backgroundColor: '#0C1F37',
    width: 378,
    height: 63,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#62F0F0',
    overflow: 'hidden',
    position: 'absolute',
    top: '68%',
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
    top: -10,
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
        <Icon name="home" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

const PillIcon = () => {
  return (
    <TouchableOpacity>
      <View style={{ bottom: '65%', left: '45%' }}>
        <MIcon name="pill" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
};

const HeadIcon = () => {
  return (
    <TouchableOpacity>
      <View style={{ bottom: '170%', left: '80%' }}>
        <MIcon name="head" size={30} color="#24cccc" />
      </View>
    </TouchableOpacity>
  );
};



export default Add_Med_Screen_2