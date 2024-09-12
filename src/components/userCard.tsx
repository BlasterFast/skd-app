import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// props
interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
  }

interface UserCardProps {
    firstName: string;
    lastName: string;
    email: string;
    picture: Picture
}

const UserCard: React.FC<UserCardProps> = ({ firstName, lastName, picture }) => {
  return (
    <View style={styles.card}>
        <Image source={{uri: picture.medium}} style={{ width: 100, height: 100 }}  />
      <Text style={styles.name}>{firstName} {lastName}</Text>
    </View>
  );
};
  
  export default UserCard;

  const styles = StyleSheet.create({
    card: {
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3, // For Android shadow effect
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    email: {
      fontSize: 14,
      color: '#666',
    },
  });