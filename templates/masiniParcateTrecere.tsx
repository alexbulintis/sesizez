import generateGoogleMapsLink from '../reusables/generateGoogleMapsLink';
import generateIntroduction from '../reusables/generateIntroduction';
import generateSignature from '../reusables/generateSignature';
import { reportedLocation, userPersonalData } from '../types';
import Location, {getMappingFunction} from "../reusables/Location";

const mailMapping = {
  [Location.BSec1]: ['contact@politialocalasector1.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec2]: ['office@politialocalas2.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec3]: ['secretariat@politialocala3.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec4]: ['sesizari@politialocala4.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec5]: ['politialocala@sector5.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec6]: ['office@politia6.ro', 'bpr@b.politiaromana.ro'],
}

const masiniParcateTrecere = {
  title: 'Masini parcate in apropierea trecerii de pietoni',
  generator: (personal: userPersonalData, location: reportedLocation) => {
    const introduction = generateIntroduction(personal);
    const googleMapsLink = generateGoogleMapsLink(location.lat, location.lng);
    const signature = generateSignature(personal);
    return (
      `${introduction}\n\n` +
      `Vă scriu în legătură cu mașinile parcate neregulamentar în apropierea trecerii de pietoni de pe lângă ${location.adresaLinie1} (vedeți pozele ataşate și link-ul pentru hartă de mai jos)\n\n` +
      `Aceste mașini parcate neregulamentar fac imposibilă observarea în timp util a pietonilor, punându-le acestora viața în pericol când intenționează să treacă strada.\n\n` +
      `Link locație: ${googleMapsLink}\n\n` +
      `Doresc: \n` +
      `- amendarea șoferilor care parchează ilegal, nerespectând distanța minimă față de trecerea de pietoni,\n` +
      `- montarea panourilor de semnalizare a interzicerii parcării într-un punct cu o vizibilitate bună,\n` +
      `- extinderea trotuarului în apropierea trecerii de pietoni pentru a preveni parcatul neregulamentar (exemplu: https://i.imgur.com/iCKDqTU.jpg ),\n` +
      `Prin aceste acțiuni consider că se vor asigura condiții de traversare în siguranță pentru toate categoriile de persoane.\n\n` +
      `${signature}`
    );
  },
  destination: getMappingFunction(mailMapping)
};

export default masiniParcateTrecere;
