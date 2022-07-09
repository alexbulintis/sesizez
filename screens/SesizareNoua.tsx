import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Text, View } from '../components/Themed';
import { model, RootTabScreenProps, userPersonalData } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Button, Icon, Input } from '@ui-kitten/components';
import { getCurrentLocation } from '../reusables/getCurrentLocation';
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';
import trotuarBlocatMasini from '../templates/trotuarBlocatMasini';
import trotuarDegradat from '../templates/trotuarDegradat';
import trecerePietoniVopseaStearsa from '../templates/trecerePietoniVopseaStearsa';
import pistaBicicleteNesigura from '../templates/pistaBicicleteNesigura';
import pistaBicicleteInexistenta from '../templates/pistaBicicleteInexistenta';
import masiniParcateTrecere from '../templates/masiniParcateTrecere';
import { osmReverseLookup } from '../reusables/osmReverseLookup';
import { calculateCoordinateDistance } from '../reusables/calculateCoordinateDistance';
import { IssueCard } from '../components/IssueCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { replaceDiacritics } from '../reusables/replaceDiacritics';
import transportPublicBlocatTrafic from '../templates/transportPublicBlocatTrafic';

const templates = [
  trotuarBlocatMasini,
  trotuarDegradat,
  trecerePietoniVopseaStearsa,
  masiniParcateTrecere,
  transportPublicBlocatTrafic,
  pistaBicicleteNesigura,
  pistaBicicleteInexistenta,
];

export default function SesizareNoua({
  navigation,
}: RootTabScreenProps<'SesizareNoua'>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [images, setImages] = useState<Array<string>>([]);
  const [firstImageExif, setFirstImageExif] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const checkLocalStorage = async () => {
    // get all required fields from local storage and show modal if not set
    const localStorageArr = await AsyncStorage.multiGet([
      'nume',
      'prenume',
      'cnp',
      'adresaLinie1',
      'localitate',
      'judet',
    ]);
    // if any of those are empty strings or null, show modal
    if (
      localStorageArr.some(([key, value]) => value === null || value === '')
    ) {
      navigation.navigate('Date Personale');
      return false;
    }
    return true;
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const sendEmail = async () => {
    setIsLoading(true);
    const isProfileCompleted = await checkLocalStorage();
    if (!isProfileCompleted) {
      setIsLoading(false);
      return;
    }
    if (!images.length) {
      Alert.alert('Trebuie să adaugi cel puțin o poză doveditoare.');
      setIsLoading(false);
      return;
    }
    const personalData: userPersonalData = {
      nume: (await AsyncStorage.getItem('nume')) || '',
      prenume: (await AsyncStorage.getItem('prenume')) || '',
      cnp: (await AsyncStorage.getItem('cnp')) || '',
      adresaLinie1: (await AsyncStorage.getItem('adresaLinie1')) || '',
      adresaLinie2: (await AsyncStorage.getItem('adresaLinie2')) || '',
      localitate: (await AsyncStorage.getItem('localitate')) || '',
      judet: (await AsyncStorage.getItem('judet')) || '',
    };

    let currentLocation = await getCurrentLocation();

    // if image was taken further away from the user
    const exif = await firstImageExif;
    if (exif?.GPSLatitude && exif?.GPSLongitude && currentLocation) {
      const distanceFromHere = calculateCoordinateDistance(
        { lat: currentLocation?.lat, lng: currentLocation?.lng },
        { lat: exif.GPSLatitude, lng: exif.GPSLongitude }
      );

      if (distanceFromHere > 100) {
        Alert.alert(
          'Poza a fost făcută departe de locația curentă. Vom folosi locația pozei în sesizare.'
        );

        currentLocation = await osmReverseLookup({
          lat: exif.GPSLatitude,
          lng: exif.GPSLongitude,
        });
      }
    }

    if (!currentLocation) {
      setIsLoading(false);
      Alert.alert(
        'Eroare',
        'Nu am putut obține locația curentă. Te rugăm să încerci din nou.'
      );
      return;
    }
    try {
      MailComposer.composeAsync({
        body: templates[selectedIndex].generator(personalData, currentLocation),
        subject: templates[selectedIndex].title,
        recipients: templates[selectedIndex].destination(
          currentLocation.localitate,
          currentLocation.judet
        ),
        attachments: images,
      });
    } catch (e) {
      Alert.alert(
        'Eroare',
        'Nu am putut trimite emailul. Te rugăm să încerci din nou.'
      );
    }
    setIsLoading(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      exif: true,
    });

    if (!result.cancelled && result.uri) {
      setFirstImageExif(result.exif);
      setImages([...images, result.uri]);
    }
  };

  const shootImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.cancelled && result.uri) {
      setImages([...images, result.uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (index === 0) {
      setFirstImageExif(undefined);
    }
  };

  const filterSearch = (model: model) => {
    return replaceDiacritics(model.title.toLowerCase()).includes(
      replaceDiacritics(searchQuery.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tip sesizare:</Text>
      <Input
        placeholder={`Caută printre tipurile de sesizări`}
        value={searchQuery}
        onChangeText={(nextValue) => setSearchQuery(nextValue)}
        style={{ margin: '5%', marginBottom: 0 }}
      />
      <View style={{ height: 160 }}>
        <SafeAreaProvider>
          <ScrollView horizontal={true} directionalLockEnabled={true}>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
              {templates.filter(filterSearch).map((template, index) => (
                <IssueCard
                  key={template.title}
                  template={template}
                  selected={selectedIndex === index}
                  onPress={() => setSelectedIndex(index)}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaProvider>
      </View>
      <Text style={styles.label}>Imagini:</Text>
      <View style={styles.imagesContainer}>
        {images.map((img, index) => (
          <TouchableOpacity
            key={`to-${index}`}
            activeOpacity={0.5}
            onPress={() => removeImage(index)}
          >
            <Image
              key={index}
              source={{ uri: img }}
              style={{ width: 50, height: 50, marginRight: 5 }}
            />
          </TouchableOpacity>
        ))}
        <Button
          style={{ width: 50, height: 50, marginRight: 5 }}
          onPress={pickImage}
        >
          +
        </Button>
        <Button
          style={{ width: 50, height: 50, paddingLeft: 30 }}
          onPress={shootImage}
          accessoryLeft={<Icon name="camera" />}
        >
          &nbsp;
        </Button>
      </View>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" color="gray" />
      ) : (
        <Button style={{ marginTop: 20, margin: '5%' }} onPress={sendEmail}>
          Trimite
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: '5%',
  },
  title: {
    margin: '5%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    margin: '10%',
  },
  select: {
    width: '100%',
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
});
