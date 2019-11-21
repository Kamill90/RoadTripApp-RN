import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import { compose, graphql } from 'react-apollo';
import {NavigationInjectedProps} from 'react-navigation';

// import { locationDataQuery } from 'api';

export class QuizScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>countryRegion:</Text>
        <Text>adminDistrict:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default compose(
//   graphql(locationDataQuery, { name: 'locationDataResults' }),
// )(QuizScreen);
