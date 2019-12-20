import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextProps,
  RefreshControl,
} from 'react-native';
import { palette } from 'styles';

interface Props extends TextProps {
  children?: JSX.Element | JSX.Element[];
  refreshContol?: () => void;
  refreshing?: boolean;
}

export const Template: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return (
    <ScrollView
      bounces={!!props.refreshContol}
      style={styles.contentContainer}
      refreshControl={
        props.refreshContol ? (
          <RefreshControl
            refreshing={!!props.refreshing}
            onRefresh={props.refreshContol}
          />
        ) : (
          <View />
        )
      }
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: palette.mainBackground,
  },
});
