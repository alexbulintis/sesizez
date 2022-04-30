/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  'Date Personale': undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  SesizareNoua: undefined;
  Despre: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type userPersonalData = {
  nume: string;
  prenume: string;
  adresaLinie1: string;
  adresaLinie2: string;
  judet: string;
  localitate: string;
  cnp: string;
}

export type reportedLocation = {
  lat: number;
  lng: number;
  adresaLinie1: string;
  adresaLinie2: string;
  judet: string;
  localitate: string;
}

export type authorities = 'adp' | 'brigadaRutiera' | 'politiaLocala' | 'primarie' | 'cameraDeputatilor';