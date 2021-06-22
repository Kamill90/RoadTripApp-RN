import { Button } from 'components';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class VerifyScreen extends Component {
  modalComponent = () => (
    <Button
      title="Sign up done"
      onPress={() => {
        this.props.navigation.popToTop();
        this.props.navigation.popToTop();
      }}
      type="regular"
    />
  );

  render() {
    return (
      <View>
        <Text> VerifyScreen </Text>
        <Button
          title="Verify code"
          onPress={() => this.props.navigation.navigate('Modal', { component: this.modalComponent() })}
          type="regular"
        />
        <Button title="Send again" onPress={() => {}} type="textButton" />
      </View>
    );
  }
}
