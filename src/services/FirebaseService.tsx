import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

export const reportError = (error: Error | any) => {
  if (__DEV__) {
    return;
  }
  crashlytics().recordError(error);
};

export const logToCrashlytics = (log: string) => {
  if (__DEV__) {
    return;
  }
  crashlytics().log(log);
};

export const logEvent = (name: string, params?: { [key: string]: any }) => {
  if (__DEV__) {
    return;
  }
  analytics().logEvent(name, params);
};
