import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { typography } from 'styles';
import { icons } from 'assets';

interface Props {
  title: string;
  children: React.ReactNode;
}

interface State {
  isNotificationCollapsed: boolean;
}

export class StyledCollapsible extends Component<Props, State> {
  state: State = {
    isNotificationCollapsed: true,
  };

  changeCollapsed = () =>
    this.setState({
      isNotificationCollapsed: !this.state.isNotificationCollapsed,
    });

  render() {
    const { isNotificationCollapsed } = this.state;
    const { title, children } = this.props;
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.changeCollapsed}
          style={styles.itemTitleContainer}
        >
          <Text style={styles.itemTitle}>{title}</Text>
          <Image
            source={icons.chevronDown}
            style={[
              styles.icon,
              !isNotificationCollapsed && { transform: [{ rotate: '180deg' }] },
            ]}
          />
        </TouchableOpacity>
        <Collapsible collapsed={isNotificationCollapsed}>
          {children}
        </Collapsible>
      </>
    );
  }
}

const styles = StyleSheet.create({
  itemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemTitle: {
    ...typography.question,
  },
  icon: { width: 24, height: 24 },
});
