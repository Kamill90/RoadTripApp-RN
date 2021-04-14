import { API_ENDPOINTS, QuestionData } from 'api';
import { i18n } from 'locale';
import { decorate, observable, computed, action } from 'mobx';
import Config from 'react-native-config';
import { logToCrashlytics } from 'services';

export const initGameData = {
  quizzes: [],
  challenges: [],
};
export class GameData {
  _quizzes: QuestionData[] = initGameData.quizzes;
  _challenges: string[] = initGameData.challenges;

  get quizzes(): QuestionData[] {
    return this._quizzes;
  }

  get challenges(): string[] {
    return this._challenges;
  }

  setQuizzes(quiz: QuestionData) {
    this._quizzes = this.quizzes.concat(quiz);
  }

  async updateQuizzes() {
    try {
      const response = await fetch(
        `${Config.FIREBASE_API}/${API_ENDPOINTS.quizzes}?token=${Config.FIREBASE_API_TOKEN}`,
      );
      const data = await response.json();
      this._quizzes = data;
    } catch (error) {
      logToCrashlytics(error.message);
      throw i18n.t('errors:fetchingQuizzes');
    }
  }

  setChallenges(challenge: any) {
    this._challenges = this.challenges.concat(challenge);
  }

  async updateChallenges() {
    try {
      const response = await fetch(
        `${Config.FIREBASE_API}/${API_ENDPOINTS.challenges}?token=${Config.FIREBASE_API_TOKEN}`,
      );
      const data = await response.json();
      this._challenges = data;
    } catch (error) {
      logToCrashlytics(error.message);
      throw i18n.t('errors:fetchingChallenges');
    }
  }

  reset() {
    this._quizzes = initGameData.quizzes;
    this._challenges = initGameData.challenges;
  }
}

decorate(GameData, {
  _quizzes: observable,
  _challenges: observable,
  quizzes: computed,
  setQuizzes: action,
  challenges: computed,
  setChallenges: action,
  reset: action,
});
