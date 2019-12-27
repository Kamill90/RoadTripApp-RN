import PushNotification from 'react-native-push-notification';

export default class NotificationService {
  tmpConfig = {
    /* Android Only Properties */
    ticker: 'My Notification Ticker', // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
    subText: 'This is a subText', // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification

    /* iOS only properties */
    alertAction: 'view', // (optional) default: view
    // category: null, // (optional) default: null
    // userInfo: null, // (optional) default: null (object containing additional notification data)

    /* iOS and Android properties */
    title: 'title: Local Notification', // (optional)
    message: 'message: My Notification Message', // (required)
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  };

  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      // onNotification: () => ,
      permissions: {
        alert: true,
        badge: false,
        sound: true,
      },
    });
  }

  localNotification(title: string) {
    PushNotification.localNotification({
      ...this.tmpConfig,
      title,
      message: 'Open the app to continue the game', // (required)
    });
  }

  cancelNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  // deprecated
  scheduledNotification(country: string) {
    PushNotification.localNotificationSchedule({
      ...this.tmpConfig,
      title: `You are in ${country}`, // (optional)
      message: 'Open the app to continue the game', // (required)
      date: new Date(Date.now() + 1000),
      repeatType: 'hour',
    });
  }
}
