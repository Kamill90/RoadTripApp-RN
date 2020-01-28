import { decorate, observable } from 'mobx';
// import { QuestionData } from './models';

class GameData {
  quizzes = [];

  setQuizzes(quiz: any) {
    this.quizzes = this.quizzes.concat(quiz);
  }
}

decorate(GameData, { quizzes: observable });

export const gameDataStore = new GameData();
