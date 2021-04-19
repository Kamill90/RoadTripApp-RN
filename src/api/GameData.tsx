import { QuestionData } from 'api';
import { decorate, observable, computed, action } from 'mobx';

import { getChallenges, getQuizzes } from './network';

export const initGameData = {
  quizzes: [],
  challenges: [],
};
export class GameData {
  constructor() {
    this._quizzes = initGameData.quizzes;
    this._challenges = initGameData.challenges;
  }
  _quizzes: QuestionData[];
  _challenges: string[];

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
      const quizzes = await getQuizzes();
      this._quizzes = quizzes;
    } catch (error) {
      throw error;
    }
  }

  setChallenges(challenge: any) {
    this._challenges = this.challenges.concat(challenge);
  }

  async updateChallenges() {
    try {
      const challenges = await getChallenges();
      this._challenges = challenges;
    } catch (error) {
      throw error;
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
