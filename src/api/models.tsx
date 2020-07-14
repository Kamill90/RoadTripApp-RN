export interface Challenge {
  content: string;
  language: string;
}

export interface GameData {
  quizzes: [QuestionData | undefined];
  challenges: [Challenge];
}

export type GameDataStore = GameData & {
  setQuizzes: (quiz: QuestionData) => void;
  setChallenges: (challenge: Challenge) => void;
  reset: () => void;
};

export interface GameSettings {
  answeredQuestions: string[];
  isLocationChanged: boolean;
  isGameActive: boolean;
  score: number;
  badges: string[];
  isReminderActive: boolean;
  isLocationNotificationActive: boolean;
  locationScores: any;
}

export interface LocationData {
  adminDistrict: string;
  adminDistrict2: string;
  countryRegion: string;
}

export type LocationStore = LocationData & {
  setLocationData: (newLocation: LocationData) => void;
  reset: () => void;
};

export type GameSettingsStore = GameSettings & {
  setAnsweredQuestions: (question: string, reasonValue: string, score: number) => void;
  setIsGameActive: (value: boolean) => void;
  setIsLocationChanged: (change: boolean) => void;
  setScore: (newScore: number) => void;
  setBadges: (badge: string) => void;
  setReminder: (value: boolean) => void;
  setLocationNotification: (value: boolean) => void;
  reset: () => void;
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
  answers: Array<string>;
  description?: string;
  question: string;
  author?: string;
  link?: string;
  tip: string;
  type: 'question' | 'result';
}

export interface Result {
  id: string;
  type: 'question' | 'result';
  question: string;
  reasonValue: string;
  correct_answer?: string;
  incorrect_answers: string[];
  answers: string[];
  author?: string;
  link?: string;
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

export interface Score {
  goldBadges: number;
  silverBadges: number;
  score: number;
}
