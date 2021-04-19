import { cleanup } from '@testing-library/react-native';
import { QuestionData } from 'api';

import { GameData, initGameData } from '../GameData';

jest.mock('react-native-config', () => ({
  GOOGLE_MAP_KEY: 'abc',
  FIREBASE_API: 'https://dummy.com',
  FIREBASE_API_TOKEN: 'def',
}));
describe('GameData store', () => {
  const GameDataStore = new GameData();
  test('should create store with default values on init ', () => {
    expect(GameDataStore.quizzes).toEqual(initGameData.quizzes);
    expect(GameDataStore.challenges).toEqual(initGameData.challenges);
  });
  test('should update values properly', () => {
    const newChallenge = 'newChallenge';
    const newQuiz1 = {
      id: '123',
      approved: true,
      reason: 'reason',
      reasonValue: 'reasonValue',
      correct_answer: 'd',
      incorrect_answers: ['a', 'b', 'c'],
      language: 'pl',
      answers: ['a', 'b', 'c', 'd'],
      question: 'Who let the dogs out?',
      tip: 'tip',
      type: 'question',
    } as QuestionData;

    const newQuiz2 = {
      id: '1233',
      approved: true,
      reason: 'reason2',
      reasonValue: 'reasonValue2',
      correct_answer: 'x',
      incorrect_answers: ['a', 'b', 'c'],
      language: 'pl',
      answers: ['a', 'b', 'c', 'x'],
      question: 'Who let the dogs out again?',
      tip: 'tip',
      type: 'question',
    } as QuestionData;
    GameDataStore.setChallenges(newChallenge);
    GameDataStore.setQuizzes(newQuiz1);
    GameDataStore.setQuizzes(newQuiz2);

    expect(GameDataStore.quizzes).toEqual([newQuiz1, newQuiz2]);
    expect(GameDataStore.challenges).toEqual([newChallenge]);
  });
  test('should have default values on reset', () => {
    expect(GameDataStore.quizzes).not.toEqual(initGameData.quizzes);
    expect(GameDataStore.challenges).not.toEqual(initGameData.challenges);
    GameDataStore.reset();
    expect(GameDataStore.quizzes).toEqual(initGameData.quizzes);
    expect(GameDataStore.challenges).toEqual(initGameData.challenges);
  });
});
