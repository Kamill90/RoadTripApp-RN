import {QueryResult} from 'react-apollo';

export interface LocationData {
  countryRegion?: string;
  adminDistrict?: string;
  adminDistrict2?: string;
}

export type LocationDataResults = LocationData & QueryResult;

export interface GameSettings {
  answeredQuestions?: (string | null)[];
  isGameActive?: boolean;
  score?: Number;
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
  type: string;
  reason: Reason;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Answers {
  incorrect_answers: string[];
}
