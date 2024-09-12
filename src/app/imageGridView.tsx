import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserCard from '../components/userCard';

const ImageGridView = () => {
  // const [usersData, setUsersData] = useState([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
        setUsersData(jsonData.results); // Set the users data to the results array
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          setError(err); // Set the error state
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <UserCard
      firstName={item.name.first}
      lastName={item.name.last}
      email={item.email}
      picture={item.picture}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        numColumns={2}
        horizontal={false}
        data={usersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.login.uuid} 
      />
    </SafeAreaView>
  );
};

export default ImageGridView;
