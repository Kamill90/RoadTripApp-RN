import auth from '@react-native-firebase/auth';

export default class Authentication {
  actionCodeSettings = {
    android: {
      packageName: 'com.RN.roadTripAp',
      /**
       * If installApp is passed, it specifies whether to install the Android app if the device supports it and the app is not already installed. If this field is provided without a packageName, an error is thrown explaining that the packageName must be provided in conjunction with this field.
       */
      installApp: true,
    },
    handleCodeInApp: true,
    url: 'https://roadfun.page.link/loginPage',
    dynamicLinkDomain: 'roadfun.page.link',
  };
  sendVerificationCode(email: string) {
    console.log('test', email, auth());
    try {
      auth().sendSignInLinkToEmail(email, this.actionCodeSettings);
    } catch (error) {
      console.log('auth erorororor', error);
    }
  }
  signOut() {
    auth().signOut();
  }
  createDummyAccount() {
    auth()
      .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
}
