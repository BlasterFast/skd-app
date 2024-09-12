import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

const Card = ({ item }) => {
    return (
        <View>
            <Text>{ item }</Text>
        </View>
    )
}

const userCard = (props: any) => {
  return (
    <View>
        <FlatList 
            data={props} 
            renderItem={({item}) => <Card item={item} />}
        />
    </View>
  )
}

export default userCard