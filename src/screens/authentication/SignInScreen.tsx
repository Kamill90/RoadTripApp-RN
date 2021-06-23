import { Button, Input } from 'components';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { ScreenTemplate } from 'screens';
import { AuthenticationService } from 'services';

interface State {
  email: string;
}

export class SignInScreen extends Component<NavigationInjectedProps, State> {
  state = {
    email: '',
  };

  modalComponent = () => (
    <Button
      title="Sign in done"
      onPress={() => {
        this.props.navigation.popToTop();
        this.props.navigation.popToTop();
      }}
      type="regular"
    />
  );

  modalFacebookComponent = () => (
    <Button
      title="Facebook sign in done"
      onPress={() => {
        this.props.navigation.popToTop();
        this.props.navigation.popToTop();
      }}
      type="regular"
    />
  );

  onSignInPress = (email: string, password: string) => {
    this.setState({ email: '' });
    this.props.navigation.navigate('Modal', { component: this.modalComponent() });
  };

  onEmailInputChange = (email: string) => this.setState({ email });

  onSendCodePress = () => {
    AuthenticationService.sendVerificationCode('kamil2912@gmail.com');
    this.props.navigation.navigate('Verify');
  };

  render() {
    return (
      <ScreenTemplate footer={<Button title="Send code" onPress={this.onSendCodePress} type="regular" />}>
        <View style={styles.container}>
          <Input title="email" placeholder="Email" onChangeText={this.onEmailInputChange} value={this.state.email} />
        </View>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorText: { fontSize: 10, color: 'red' },
});
