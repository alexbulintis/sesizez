enum Location {
  BSec1 = 'Bucuresti - Sector 1',
  BSec2 = 'Bucuresti - Sector 2',
  BSec3 = 'Bucuresti - Sector 3',
  BSec4 = 'Bucuresti - Sector 4',
  BSec5 = 'Bucuresti - Sector 5',
  BSec6 = 'Bucuresti - Sector 6',
}

export type MappingType = Partial<Record<Location, string[]>>

export const getMappingFunction = (mapping: MappingType) => {
  return (localitate: string, judet: string) => {
    const location = `${localitate} - ${judet}`;
    if (location in mapping) {
      // @ts-ignore
      return mapping[location];
    }

    return [];
  }
}

export default Location;
