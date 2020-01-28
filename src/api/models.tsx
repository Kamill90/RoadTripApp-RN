export interface GameData {
  quizzes: [QuestionData | undefined];
}

export type GameDataStore = GameData & {
  setQuizzes: (quiz: QuestionData) => void;
};

export interface GameSettings {
  answeredQuestions: [string | null];
  isGameActive?: boolean;
  isLocationChanged?: boolean;
  score?: number;
  badges: [string];
}

export interface LocationData {
  adminDistrict: string;
  adminDistrict2: string;
  countryRegion: string;
  formattedAddress: string;
}
export type LocationStore = LocationData & {
  setLocationData: (newLocation: LocationData) => void;
};

export type GameSettingsStore = GameSettings & {
  setAnsweredQuestions: (question: string) => void;
  activateGame: () => void;
  deactivateGame: () => void;
  setIsLocationChanged: (change: boolean) => void;
  setScore: (newScore: number) => void;
  setBadges: (badge: string) => void;
};

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
  id: string;
  approved: boolean;
  reason: string;
  reasonValue: string;
  correct_answer: string;
  incorrect_answers: string[];
  language: string;
  question: string;
  tip: string;
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

export enum BadgesType {
  SILVER = 'silver',
  GOLD = 'gold',
}
