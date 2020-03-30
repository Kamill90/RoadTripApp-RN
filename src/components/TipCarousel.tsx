import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { TipCard } from './TipCard';
import { typography, palette } from 'styles';
import { ProgressDots } from './ProgressDots';
import { tips as defaultTip } from 'assets';
import { Score } from 'api';
import { Scoreboard } from './Scoreboard';
import { i18n } from 'locale';

const lang = i18n.language;

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface Props {
  containScoreboard: boolean;
  score: Score;
}

interface State {
  activeCardIndex: number;
  tips: Array<{
    title: string;
    image?: string;
    description?: string;
  }>;
}
export class TipCarousel extends PureComponent<Props, State> {
  static getDerivedStateFromProps(props: Props) {
    if (props.containScoreboard) {
      return {
        tips: [{ ...props.score, title: 'Scoreboard' }, ...defaultTip[lang]],
      };
    }
    return { tips: defaultTip[lang] };
  }

  state = {
    activeCardIndex: 0,
    tips: [],
  };

  renderScoreboard = () => {
    const { score } = this.props;
    return (
      <View style={styles.scoreboardContainer}>
        <Scoreboard
          goldBadges={score.goldBadges}
          silverBadges={score.silverBadges}
          score={score.score}
          noOfQuestions={score.noOfQuestions}
        />
      </View>
    );
  };

  renderCard = (item: any) => {
    if (this.props.containScoreboard && item.index === 0) {
      return this.renderScoreboard();
    }
    return <TipCard tipImage={item.item.image} />;
  };

  onSnapToItem = (slideIndex: number) => {
    this.setState({
      activeCardIndex: slideIndex,
    });
  };

  render() {
    const { tips } = this.state;
    return (
      <View style={styles.container}>
        <Carousel
          data={tips!}
          renderItem={this.renderCard}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH * 0.8}
          onSnapToItem={this.onSnapToItem}
          removeClippedSubviews={false}
        />
        <ProgressDots data={tips} active={this.state.activeCardIndex} />
        <View style={styles.textContainer}>
          <Text style={[typography.tipTitle, styles.title]}>
            {tips[this.state.activeCardIndex]!.title}
          </Text>
          <Text style={typography.tipDescription}>
            {tips[this.state.activeCardIndex]!.description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 21,
    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 22,
    position: 'absolute',
  },
  scoreboardContainer: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: palette.primary,
    borderRadius: 22,
  },
  title: { paddingBottom: 5, textAlign: 'center' },
  textContainer: {
    height: 100,
    paddingHorizontal: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
