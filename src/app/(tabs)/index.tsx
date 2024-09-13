import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import SwipeCard from '@/src/components/SwipeCard';

interface User {
  name: { first: string; last: string };
  photo?: string,
  location: {city: string}
}

// Just here for generating better photos during dev

const photo1 = require('../../../assets/randomProfiles/uifaces_01.jpg');
const photo2 = require('../../../assets/randomProfiles/uifaces_02.jpg');
const photo3 = require('../../../assets/randomProfiles/uifaces_03.jpg');
const photo4 = require('../../../assets/randomProfiles/uifaces_04.jpg');
const photo5 = require('../../../assets/randomProfiles/uifaces_05.jpg');
const photo6 = require('../../../assets/randomProfiles/uifaces_06.jpg');


const photos = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
];

const getRandomPhotos = () => {
  const randomIndex = Math.floor(Math.random() * photos.length);
  return (photos)[randomIndex];
};


// Just here for generating better photos during dev


const Linkup: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://randomuser.me/api/?results=200&gender=female');
        if (!response.ok) {
          throw new Error('Network Response was not okay...');
        }
        const jsonData = await response.json();

        // Adding better photo vvv
        const usersWithPhotos = jsonData.results.map((user: User) => ({
          ...user,
          photo: getRandomPhotos()
        }))
        // Adding better photos ^^^

        // setUsersData(jsonData.results);
        setUsersData(usersWithPhotos);

      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          setError(err);
        }
      } finally {
        console.log('test')
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <SwipeCard data={usersData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center', 
    backgroundColor: '#000', // This black means that when we swipe left or right, the exposed background is black.
  },
});

export default Linkup;
