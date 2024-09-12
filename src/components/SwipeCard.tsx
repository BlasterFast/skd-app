import { mainThemeColor } from '@/constants/Colors';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  name: { first: string; last: string };
  picture: { medium: string, large: string };
  cell?: string;
}

interface SwipeCardProps {
  data: User[];
}


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SwipeCard: React.FC<SwipeCardProps> = ({ data }) => {
  const cards = data || [];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          cardStyle={styles.card}
          cards={cards}
          renderCard={(card) => {
            // Check if card is defined and has required properties
            if (!card || !card.picture || !card.name) {
              return (
                <View style={styles.card}>
                  <Text style={styles.name}>No Data Available</Text>
                </View>
              );
            }

            return (
              <View style={styles.card}>
                <Image source={{ uri: card.picture.large }} style={styles.image} />
                <Text style={styles.name}>{card.name.first} {card.name.last}</Text>
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            console.log('Swiped card index:', cardIndex);
          }}
          onSwipedAll={() => {
            console.log('All cards swiped');
          }}
          cardIndex={0}
          backgroundColor={'#f5f5f5'}
          stackSize={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: viewportWidth,
    // paddingRight: viewportWidth * .107, // This fixes the position of the caxrd being to right. Can't find out why. Crap fix.
  },
  swiperContainer: {
    width: viewportWidth,
    height: viewportHeight * 0.9,
    backgroundColor: '#fff'
  },
  card: {
    // width: viewportWidth,  // CAUTION This line, and the line below it was making the card hang to the right. Keep for caution.
    // height: viewportHeight * 0.9, 
    // paddingRight: viewportWidth * .107 // this centers the cards instead of them heading right.But it leaves a white line on the card.
    borderRadius: 10,
    backgroundColor: "#000",
  },
  image: {
    width: '100%',
    height: '100%', // This determines how much of the description space we see on the bottom of images.
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cell: {
    fontSize: 14,
    color: '#666',
  },
});

export default SwipeCard;
