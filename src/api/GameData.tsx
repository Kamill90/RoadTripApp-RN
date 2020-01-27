import { decorate, observable } from 'mobx';

class GameData {
  quizzes = [];

  setQuizzes(quiz) {
    this.quizzes = this.quizzes.concat(quiz);
  }
}

decorate(GameData, { quizzes: observable });

export const gameDataStore = new GameData();
