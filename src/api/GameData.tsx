import { decorate, observable, computed, action } from 'mobx';

import { QuestionData } from './models';

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

  setChallenges(challenge: any) {
    this._challenges = this.challenges.concat(challenge);
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
