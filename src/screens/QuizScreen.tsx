import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {NavigationInjectedProps} from 'react-navigation';

import {locationDataQuery, gameSettingsQuery} from 'api';

interface Props extends NavigationInjectedProps {
  locationDataResults: any;
  gameSettingsResults: any;
}

class QuizScreen extends React.PureComponent<Props> {
  render() {
    const {locationDataResults, gameSettingsResults} = this.props;
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
        <Text>
          adminDistrict2: {locationDataResults.locationData.adminDistrict2}
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
