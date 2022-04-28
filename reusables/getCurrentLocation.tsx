import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { reportedLocation } from '../types';

export const getCurrentLocation = async (): Promise<reportedLocation | undefined> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Eroare', 'Permisiunea pentru locatie este necesara pentru autocompletarea adresei si generarea link-ului de harta.');
    return;
  }

  let { coords } = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = coords;
  let response = await Location.reverseGeocodeAsync({
    latitude,
    longitude
  }, {

  });

  if(!response[0].name) return;
  return {
    adresaLinie1: `Str. ${response[0].street}, nr. ${response[0].streetNumber}`,
    adresaLinie2: '',
    localitate: response[0].city?.replace('București', 'Bucuresti').replace('Bucharest', 'Bucuresti') || '',
    judet: response[0].district?.replace('București ', '').replace('Bucharest ', '') || '',
    lat: latitude,
    lng: longitude
  }
}
