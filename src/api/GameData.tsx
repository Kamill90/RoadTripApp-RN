import { decorate, observable, computed, action } from 'mobx';

import { QuestionData } from './models';

export class GameData {
  _quizzes: QuestionData[] = [];

  get quizzes(): QuestionData[] {
    return this._quizzes;
  }

  _challenges: string[] = [];

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
    this._quizzes = [];
    this._challenges = [];
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
