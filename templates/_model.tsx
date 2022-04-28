import generateGoogleMapsLink from '../reusables/generateGoogleMapsLink';
import generateIntroduction from '../reusables/generateIntroduction';
import generateSignature from '../reusables/generateSignature';
import { reportedLocation, userPersonalData } from '../types';
import Location, {MappingType} from "../reusables/Location";

const mailMapping: MappingType = {
  [Location.BSec1]: ['contact@politialocalasector1.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec2]: ['office@politialocalas2.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec3]: ['secretariat@politialocala3.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec4]: ['sesizari@politialocala4.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec5]: ['politialocala@sector5.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec6]: ['office@politia6.ro', 'bpr@b.politiaromana.ro'],
}

const model = {
  title: 'Model Sesizare',
  generator: (personal: userPersonalData, location: reportedLocation) => {
    const introduction = generateIntroduction(personal);
    const googleMapsLink = generateGoogleMapsLink(location.lat, location.lng);
    const signature = generateSignature(personal);
    return `${introduction}, ${googleMapsLink}\n\n${signature}`;
  },
  destination: (localitate: string, judet: string) => {
    const location = `${localitate} - ${judet}`;
    if (location in Location) {
      // @ts-ignore
      return mailMapping[location];
    }

    return [];
  },
};

export default model;
