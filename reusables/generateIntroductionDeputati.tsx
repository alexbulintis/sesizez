import { userPersonalData } from '../types';

const generateIntroductionDeputati = (personal: userPersonalData) => {
  const { nume, prenume, cnp, adresaLinie1, localitate, judet } = personal;
  const genderFromCNP = Number(cnp[0]) % 2 === 1 ? 'M' : 'F';
  const suffix1 = genderFromCNP === 'M' ? 'ul' : 'a';
  const suffix2 = genderFromCNP === 'M' ? '' : 'ă';

  return `Subsemnat${suffix1} ${nume} ${prenume}, cetățean${suffix2} al județului ${judet}, vă scriu în legătură cu`;
};

export default generateIntroductionDeputati;
