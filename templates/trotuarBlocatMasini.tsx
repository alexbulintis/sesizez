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

const trotuarBlocatMasini = {
  title: 'Trotuar blocat de maşini',
  generator: (personal: userPersonalData, location: reportedLocation) => {
    const introduction = generateIntroduction(personal);
    const googleMapsLink = generateGoogleMapsLink(location.lat, location.lng);
    const signature = generateSignature(personal);
    return (
      `${introduction}\n\n` +
      `Vă scriu în legătură cu trotuarele ocupate de mașini parcate neregulamentar, blocând accesul pietonal în zona ${location.adresaLinie1} (vedeți pozele atașate și link-ul pentru hartă de mai jos)\n\n` +
      `Aceste mașini parcate neregulamentar blochează zilnic accesul părinților cu cărucioare de copii și a persoanelor cu dizabilități, punându-le viața in pericol atunci când sunt nevoiți să se deplaseze pe carosabil.\n\n` +
      `Link locație: ${googleMapsLink}\n\n` +
      `Doresc: \n` +
      `- avertizarea sau amendarea deținătorilor autovehiculelor parcate neregulamentar,\n` +
      `- montarea panourilor de parcare interzisă cu o vizibilitate bună,\n` +
      `- oprirea accesului pe trotuare prin montarea unor stâlpi,\n` +
      `Prin aceste acțiuni considerăm că se va asigura accesul în siguranță pe trotuare al tuturor persoanelor.\n\n` +
      `${signature}`
    );
  },
  destination: getMappingFunction(mailMapping)
};

export default trotuarBlocatMasini;
