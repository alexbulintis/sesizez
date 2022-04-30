import generateGoogleMapsLink from '../reusables/generateOSMLink';
import generateIntroductionDeputati from '../reusables/generateIntroductionDeputati';
import generateSignature from '../reusables/generateSignature';
import { getAuthoritiesEmails } from '../reusables/getAuthoritiesEmails';
import { reportedLocation, userPersonalData } from '../types';

const pistaBicicleteNesigura = {
  title: 'Pistă de biciclete nesigură',
  generator: (personal: userPersonalData, location: reportedLocation) => {
    const introduction = generateIntroductionDeputati(personal);
    const googleMapsLink = generateGoogleMapsLink(location.lat, location.lng);
    const signature = generateSignature(personal);
    return (
      `${introduction}\n\n` +
      `{TEXTUL_SCRISORII_AICI}` +
      `${signature}`
    );
  },
  destination: (localitate: string, judet: string) => {
    return getAuthoritiesEmails(localitate, judet, 'cameraDeputatilor');
  },
};

export default pistaBicicleteNesigura;