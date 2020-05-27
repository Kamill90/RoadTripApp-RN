import crashlytics from '@react-native-firebase/crashlytics';

export const reportError = (error: Error | any) => {
  crashlytics().recordError(error);
};

export const logToCrashlytics = (log: string) => crashlytics().log(log);
