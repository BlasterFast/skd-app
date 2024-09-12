import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  name: { first: string; last: string };
  picture: { medium: string };
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
      <Swiper
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
              <Image source={{ uri: card.picture.medium }} style={styles.image} />
              <Text style={styles.name}>{card.name.first} {card.name.last}</Text>
              {/* {card.cell && <Text style={styles.cell}>{card.cell}</Text>} Optional field */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: viewportWidth - 40, // Adjust based on design
    height: viewportHeight * 0.6, // Adjust based on design
  },
  image: {
    width: '100%',
    height: '70%', // Adjust based on design
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  cell: {
    fontSize: 14,
    color: '#666',
  },
});

export default SwipeCard;
