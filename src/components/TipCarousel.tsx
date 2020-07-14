import { images } from 'assets';
import { i18n } from 'locale';
import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { typography } from 'styles';

import { ProgressDots } from './ProgressDots';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface State {
  activeCardIndex: number;
}

interface Item {
  title: string;
  image: string;
  description: string;
}

const tips = ['locationBased', 'badges', 'teamSpirit', 'battery', 'safetyFirst'];

const TipCard = ({ item }: { item: string }) => (
  <View style={styles.itemContainer}>
    <View style={styles.imageContainer}>
      <Image source={images[item]} style={styles.image} resizeMode="contain" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{i18n.t(`tips:${item}:title`)}</Text>
      <Text style={styles.tipDescription}>{i18n.t(`tips:${item}:description`)}</Text>
    </View>
  </View>
);

export class TipCarousel extends PureComponent<any, State> {
  state = {
    activeCardIndex: 0,
  };

  onSnapToItem = (slideIndex: number) => {
    this.setState({
      activeCardIndex: slideIndex,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ProgressDots data={tips} active={this.state.activeCardIndex} />
        <Carousel
          data={tips}
          renderItem={(item: any) => <TipCard key={item.item.id} item={item.item} />}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          onSnapToItem={this.onSnapToItem}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 21,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1.5,
  },
  image: { width: '100%', height: '100%' },
  title: {
    paddingBottom: 5,
    textAlign: 'center',
    ...typography.tipTitle,
    paddingHorizontal: 30,
  },
  tipDescription: {
    ...typography.tipDescription,
    paddingHorizontal: 30,
  },
});
