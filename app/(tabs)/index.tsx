import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';

const Linkup = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('https://randomuser.me/api/?results=5');
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
      <View>
        <Text>{item.name.first} {item.name.last}</Text>
        <Text>{item.email}</Text> 
      </View>
    );
  };

  console.log(JSON.stringify(usersData));

  return (
    <SafeAreaView>
      <FlatList
        data={usersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.login.uuid} 
      />
    </SafeAreaView>
  );
};

export default Linkup;
