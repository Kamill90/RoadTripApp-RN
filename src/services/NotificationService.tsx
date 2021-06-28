import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';

export default class NotificationService {
  channelId: string;
  tmpConfig = {
    /* Android Only Properties */
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"

    // color: 'red', // (optional) default: system default
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
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  };

  constructor() {
    this.channelId = 'channel-id';
    this.configure();
  }

  configure() {
    PushNotification.createChannel(
      {
        channelId: this.channelId, // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created: boolean) => created, // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification(notification) {
        // required on iOS only
        console.log('onNotification', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onRegister(token) {
        console.log('TOKEN:', token);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  localNotification(title: string, message: string) {
    // PushNotification.clearAllNotifications();
    PushNotification.localNotification({
      channelId: this.channelId,
      ...this.tmpConfig,
      title,
      message,
    });
  }

  cancelNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  // observe location and notify about current location in notification box
  scheduledNotification(title: string, message: string) {
    PushNotification.localNotificationSchedule({
      ...this.tmpConfig,
      channelId: this.channelId,
      title,
      message,
      date: new Date(Date.now() + 60 * 60 * 1000),
      repeatType: 'hour', // every 2 hours only in daytime would be great
    });
  }
}
