import { QueryResult } from 'react-apollo';

export interface LocationData {
  countryRegion?: string;
  adminDistrict?: string;
  adminDistrict2?: string;
  formattedAddress?: string;
}

export interface GameData {
  quizzes: [QuestionData?];
}

export interface LocationDataResponse {
  locationData: LocationData;
}

export interface GameDataResponse {
  gameData: GameData;
}

export type LocationDataResults = LocationDataResponse & QueryResult;

export type GameDataResults = GameDataResponse & QueryResult;

export interface GameSettings {
  answeredQuestions: [string | null];
  isGameActive?: boolean;
  isLocationChanged?: boolean;
  score?: number;
  badges: [string?];
}

export interface GameSettingsMutationVariables {
  answeredQuestion?: string;
  isGameActive?: boolean;
  isLocationChanged?: boolean;
  score?: number;
  badge?: string;
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
  adminDistrict: string;
  adminDistrict2: string;
  countryRegion: string;
  formattedAddress: string;
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
  tip: string;
}

export interface QuestionData {
  approved: boolean;
  reason: string;
  reasonValue: string;
  correct_answer: string;
  incorrect_answers: string[];
  language: string;
  question: string;
  tip: string;
  id: string;
  type: 'question' | 'result';
}

export interface Result {
  id: string;
  type: 'question' | 'result';
  question: string;
  reasonValue: string;
  correct_answer?: string;
  incorrect_answers?: string[];
  description?: string;
  tip?: string;
}

export interface Answers {
  incorrect_answers: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export type FetchLocation = 'success' | 'failure';
