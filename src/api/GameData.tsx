import { decorate, observable, computed, action } from 'mobx';
import { QuestionData } from './models';

class GameData {
  _quizzes = [];

  get quizzes(): string[] {
    return this._quizzes;
  }

  setQuizzes(quiz: QuestionData) {
    this._quizzes = this.quizzes.concat(quiz);
  }

  reset() {
    this._quizzes = [];
  }
}

decorate(GameData, {
  _quizzes: observable,
  quizzes: computed,
  setQuizzes: action,
  reset: action,
});

export const gameDataStore = new GameData();
