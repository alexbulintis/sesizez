import generateGoogleMapsLink from '../reusables/generateGoogleMapsLink';
import generateIntroduction from '../reusables/generateIntroduction';
import generateSignature from '../reusables/generateSignature';
import { reportedLocation, userPersonalData } from '../types';
import Location, {getMappingFunction} from "../reusables/Location";

const mailMapping = {
  [Location.BSec1]: [
    'contact@politialocalasector1.ro',
    'office@aspmb.ro',
    'registratura@primarias1.ro',
    'secretariat@adp-sector1.ro',
  ],
  [Location.BSec2]: [
    'office@politialocalas2.ro',
    'office@aspmb.ro',
    'infopublice@ps2.ro',
    'office@adp2.ro',
  ],
  [Location.BSec3]: [
    'secretariat@politialocala3.ro',
    'office@aspmb.ro',
    'relatiipublice@primarie3.ro',
    'domeniu.public@primarie3.ro',
  ],
  [Location.BSec4]: [
    'sesizari@politialocala4.ro',
    'office@aspmb.ro',
    'info@adp4.ro',
    'contact@ps4.ro',
    'info@totulverde.ro',
  ],
  [Location.BSec5]: [
    'politialocala@sector5.ro',
    'office@aspmb.ro',
    'sesizari@sector5.ro',
    'primarie@sector5.ro',
    'dadp@sector5.ro',
  ],
  [Location.BSec6]: [
    'office@politia6.ro',
    'office@aspmb.ro',
    'prim6@primarie6.ro',
    'contact@adps6.ro',
  ],
}

const trecerePietoniVopseaStearsa = {
  title: 'Trecere pietoni - vopsea ștearsă',
  generator: (personal: userPersonalData, location: reportedLocation) => {
    const introduction = generateIntroduction(personal);
    const googleMapsLink = generateGoogleMapsLink(location.lat, location.lng);
    const signature = generateSignature(personal);
    return (
      `${introduction}\n\n` +
      `Vă scriu în legătură cu trecerile de pietoni din apropierea ${location.adresaLinie1}, link harta: ${googleMapsLink}\n\n` +
      `În prezent oricine vrea să traverseze strada este pus în pericol din cauza absenței marcajelor corespunzătoare. Vopseaua este ștearsă, reducând vizibilitatea trecerii de pietoni de către șoferii ce conduc cu viteză. Situația curentă se poate vedea și în pozele atașate.\n\n` +
      `Doresc repararea acestor treceri de pietoni și aducerea lor la un standard decent pentru a putea traversa în siguranță strada:\n\n` +
      `- nivelarea trecerilor de pietoni: diferență de nivel lină între trotuar și carosabil \n` +
      `- marcarea (revopsirea) trecerii de pietoni în mod corespunzător\n` +
      `- îmbunătățirea semnelor de atenționare că urmează o trecere de pietoni (amplasare corespunzătoare, curățare)\n\n` +
      `${signature}`
    );
  },
  destination: getMappingFunction(mailMapping)
};

export default trecerePietoniVopseaStearsa;
