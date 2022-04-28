import generateGoogleMapsLink from "../reusables/generateGoogleMapsLink";
import generateIntroduction from "../reusables/generateIntroduction";
import generateSignature from "../reusables/generateSignature";
import { reportedLocation, userPersonalData } from "../types";
import Location, {getMappingFunction} from "../reusables/Location";

const mailMapping = {
  [Location.BSec1]: ['contact@politialocalasector1.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec2]: ['office@politialocalas2.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec3]: ['secretariat@politialocala3.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec4]: ['sesizari@politialocala4.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec5]: ['politialocala@sector5.ro', 'bpr@b.politiaromana.ro'],
  [Location.BSec6]: ['office@politia6.ro', 'bpr@b.politiaromana.ro'],
}

const trotuarDegradat = {
  title: 'Trotuar degradat',
  generator: (personal: userPersonalData, location: reportedLocation) => {
    const introduction = generateIntroduction(personal);
    const googleMapsLink = generateGoogleMapsLink(location.lat, location.lng);
    const signature = generateSignature(personal);
    return `${introduction}\n\n` +
     `Aduc în atenția dvs. câteva dintre problemele de pe trotuarele din apropierea ${location.adresaLinie1}.\n` +
     `Plimbându-mă în zona din jurul ${location.adresaLinie1}, am sesizat mai multe nereguli legate de starea trotuarelor. Există multe gropi, denivelări, treceri de pietoni cu obstacole precum bordurile înalte.\n` +
     `Pentru părinții cu cărucioare de copii și persoanele cu dizabilități o plimbare plăcută în oraș se transformă într-un drum anevoios și obositor.\n` +
     `Atașez câteva poze făcute cu telefonul, cu situația din teren, și vă las aici link-ul pentru hartă: ${googleMapsLink}\n\n` +
     `Doresc repararea acestor trotuare și aducerea lor la un standard decent pentru a putea circula în siguranță ca pietoni. \n\n` +
    `${signature}`;
  },
  destination: getMappingFunction(mailMapping)
}

export default trotuarDegradat;
