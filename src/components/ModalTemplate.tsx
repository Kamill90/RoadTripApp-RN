import React, { PureComponent } from 'react';
import { StyleSheet, TextProps, Animated } from 'react-native';

interface Props extends TextProps {
  children?: JSX.Element | JSX.Element[];
}
interface State {
  backgroundAnimation: any;
}

export class ModalTemplate extends PureComponent<Props, State> {
  state = {
    backgroundAnimation: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.timing(this.state.backgroundAnimation, {
      toValue: 1,
      duration: 2000,
    }).start();
  }
  render() {
    const backgroundColorAnimated = this.state.backgroundAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)'],
    });
    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColorAnimated,
          },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
