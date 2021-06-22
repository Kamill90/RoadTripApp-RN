import { ModalTemplate } from 'components';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class Modal extends Component {
  render() {
    return (
      <ModalTemplate>
        <Text> textInComponent </Text>
        {this.props.navigation.getParam('component')}
      </ModalTemplate>
    );
  }
}
