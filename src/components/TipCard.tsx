import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { images } from 'assets';

export const TipCard = ({ tipImage }: { tipImage: string }) => {
  return (
    <Image
      source={images[tipImage]}
      style={styles.container}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    borderRadius: 22,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
});
