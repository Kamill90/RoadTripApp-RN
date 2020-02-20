import React from 'react';
import { ScrollView, StyleSheet, Text, Image } from 'react-native';

import { icons } from 'assets';
import { palette, typography } from 'styles';

export const TipCard = ({
  description,
  iconName,
}: {
  description: string;
  iconName: string;
}) => {
  console.log('url');
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={true}
    >
      <Image source={icons[iconName]} style={styles.image} />
      <Text style={typography.tipDescription}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: palette.grey,
    borderRadius: 22,
    padding: 20,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
});
