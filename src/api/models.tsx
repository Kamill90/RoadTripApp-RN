import { QueryResult } from 'react-apollo';

export interface LocationData {
  countryRegion?: string;
  adminDistrict?: string;
  adminDistrict2?: string;
}

export interface LocationDataResponse {
  locationData: LocationData;
}
export type LocationDataResults = LocationDataResponse & QueryResult;

export interface GameSettings {
  answeredQuestions?: [string | null];
  isGameActive?: boolean;
  isLocationChanged?: boolean;
  score?: number;
}

export interface GameSettingsMutationVariables {
  answeredQuestion?: string;
  isGameActive?: boolean;
  isLocationChanged?: boolean;
  score?: number;
}

export interface GameSettingsData {
  gameSettings: GameSettings;
}

export interface GameSettingsResponse {
  data: {
    setGameSettings: GameSettings;
  };
}

export type GameSettingsResults = GameSettingsData & QueryResult;

export interface AddressData {
  addressLine: string;
  adminDistrict: string;
  adminDistrict2: string;
  countryRegion: string;
  formattedAddress: string;
  locality: string;
  postalCode: string;
}

enum Reason {
  countryRegion = 'countryRegion',
  adminDistrict = 'adminDistrict',
  adminDistrict2 = 'adminDistrict2',
}

export interface Question {
  id: string;
  type: 'question' | 'result';
  reason: Reason;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Result {
  id: string;
  type: 'question' | 'result';
  question: string;
  correct_answer?: string;
  incorrect_answers?: string[];
}

export interface Answers {
  incorrect_answers: string[];
}
