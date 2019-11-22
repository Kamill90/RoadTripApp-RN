import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {NavigationInjectedProps} from 'react-navigation';

import {locationDataQuery} from 'api';

interface Props extends NavigationInjectedProps {
  locationDataResults: any;
}

class QuizScreen extends React.PureComponent<Props> {
  render() {
    const {locationDataResults} = this.props;
    if (locationDataResults.loading) {
      return null;
    }
    return (
      <View style={styles.mainContainer}>
        <Text>
          countryRegion: {locationDataResults.locationData.countryRegion}
        </Text>
        <Text>
          adminDistrict: {locationDataResults.locationData.adminDistrict}
        </Text>
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

export default compose(
  graphql(locationDataQuery, {name: 'locationDataResults'}),
)(QuizScreen);
