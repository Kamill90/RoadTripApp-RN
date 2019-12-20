import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TextProps,
  RefreshControl,
} from 'react-native';
import { palette } from 'styles';

interface Props extends TextProps {
  children?: JSX.Element | JSX.Element[];
  refreshContol?: () => void;
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
        <RefreshControl refreshing={false} onRefresh={props.refreshContol} />
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
