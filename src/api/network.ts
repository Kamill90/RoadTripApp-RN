import { API_ENDPOINTS } from 'api';
import axios from 'axios';
import { i18n } from 'locale';
import Config from 'react-native-config';
import { reportError } from 'services';

export const getQuizzes = async () => {
  try {
    const response = await axios.get(
      `${Config.FIREBASE_API}/${API_ENDPOINTS.quizzes}?token=${Config.FIREBASE_API_TOKEN}`,
    );
    const data = await response.data;
    return data;
  } catch (error) {
    reportError(error);
    throw new Error(i18n.t('errors:fetchingQuizzes'));
  }
};

export const getChallenges = async () => {
  try {
    const response = await axios.get(
      `${Config.FIREBASE_API}/${API_ENDPOINTS.challenges}?token=${Config.FIREBASE_API_TOKEN}`,
    );
    const data = await response.data;
    return data;
  } catch (error) {
    reportError(error);
    throw i18n.t('errors:fetchingChallenges');
  }
};
