import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import SwipeCard from '@/src/components/SwipeCard';

interface User {
  name: { first: string; last: string };
  picture: { medium: string };
  cell?: string;
}

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
        setUsersData(jsonData.results);
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
    backgroundColor: '#f5f5f5',
    paddingTop: 20, // Adjust padding or margin as needed
  },
});

export default Linkup;
