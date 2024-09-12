import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const linkup = () => {
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) {
          throw new Error('Network Response was not okay...');
        }
        const jsonData = await response.json();
        setUsersData(jsonData);
      } catch (err) {
        if (err instanceof Error) { 
          console.log(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  console.log(usersData);

  return (
    <View>
      <Text>This is the main LinkUp Match where you match on people. App opens here.</Text>
    </View>
  )
}

export default linkup