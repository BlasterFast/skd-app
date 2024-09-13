import { mainThemeColor } from '@/constants/Colors';
import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { TouchableOpacity } from 'react-native'; // not from gesture handler. Doesn't fire if you do imort from there.
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';



interface User {
  name: { first: string; last: string };
  cell?: string;
  photo?: any,
  dob: { age: string }
  location: { city: string }
}

interface SwipeCardProps {
  data: User[];
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



const SwipeCard: React.FC<SwipeCardProps> = ({ data }) => {
  const cards = data || [];

  const swiperRef = useRef<Swiper<User>>(null);

  const handleSwipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
      console.log('Pressed left');
    }
  };

  const handleSwipeRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
      console.log('Pressed right');
    }
  };
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            // cardStyle={styles.card}
            cards={cards}
            renderCard={(card) => {
              // Check if card is defined and has required properties
              if (!card || !card.photo || !card.name) {
                return (
                  <View style={styles.card}>
                    <Text style={styles.name}>No Data Available</Text>
                  </View>
                );
              }
              console.log(card.photo);
              return (
                <View style={styles.imgbgconatiner}>
                  <ImageBackground source={card.photo} style={styles.image} imageStyle={{ borderRadius: 10 }}>
                    <LinearGradient
                      // Background Linear Gradient
                      colors={['rgba(0,0,0,1)', 'transparent']}
                      style={styles.background}
                      start={{ x: 0, y: 1 }}  
                      end={{ x: 0, y: 0 }} 
                    />
                    <View style={styles.textCard}>
                      <Text style={styles.name}>{card.name.first}, {card.dob.age}</Text>
                      <View style={styles.location}>
                        <FontAwesome name="home" size={20} color="white" />
                        <Text style={styles.city}>{card.location.city}</Text>
                      </View>
                    </View>

                    <View style={styles.btnContainer}>
                      <TouchableOpacity style={styles.buttonLeft} onPress={handleSwipeLeft}>
                        <Foundation name="x" size={35} color="red" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonRight} onPress={handleSwipeRight}>
                        <AntDesign name="heart" size={30} color="green" />
                      </TouchableOpacity>
                    </View>

                  </ImageBackground>
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  imgbgconatiner: {
    height: '90%'
  },

  // This background is for the gradient.
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: viewportWidth,
    // backgroundColor: 'red'
    // paddingRight: viewportWidth * .107, // This fixes the position of the caxrd being to right. Can't find out why. Crap fix.
  },
  swiperContainer: {
    width: viewportWidth,
    height: viewportHeight * 0.9,
    // overflow: 'hidden'
  },
  card: {
    // width: viewportWidth,  // CAUTION This line, and the line below it was making the card hang to the right. Keep for caution.
    // paddingRight: viewportWidth * .1, // this centers the cards instead of them heading right.But it leaves a white line on the card.
    // backgroundColor: "transparant", // this makes it so I don't see anything under user images on swipe. I used to see the backgroundColor, white, tan, whatever.
  },
  image: {
    alignItems: 'center', // this is what centers the user info on the image.
    flex: 1,
    width: '100%',
    height: '100%', // This determines how much of the description space we see on the bottom of images.
  },
  textCard: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor: 'tan',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    // justifyContent: 'flex-end',
    width: viewportWidth * 0.8,
    marginBottom: viewportHeight * .001,
    // alignItems: 'center'
  },
  location: {
    flexDirection: 'row',
    paddingLeft: viewportWidth * 0.05,
    marginBottom: viewportHeight * 0.01
  },
  city: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: viewportWidth * 0.8,
    marginBottom: viewportHeight * 0.015,
    paddingLeft: viewportWidth * 0.02
  },
  btnContainer: {
    // backgroundColor: '#fff',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: viewportHeight * 0.04,
    // justifyContent: 'space-between'
    width: viewportWidth * 0.7,
  },
  buttonLeft: {
    backgroundColor: '#181818',
    borderRadius: 100,
    // padding: 3,
    height: viewportHeight * 0.09,
    width: viewportWidth * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRight: {
    backgroundColor: '#181818',
    borderRadius: 100,
    padding: 9,
    height: viewportHeight * 0.09,
    width: viewportWidth * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    fontSize: 14,
    color: '#666',
  },
});

export default SwipeCard;
