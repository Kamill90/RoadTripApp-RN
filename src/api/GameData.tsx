import { decorate, observable, computed, action } from 'mobx';

class GameData {
  _quizzes = [];

  get quizzes(): string[] | undefined[] {
    return this._quizzes;
  }

  setQuizzes(quiz: string) {
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
