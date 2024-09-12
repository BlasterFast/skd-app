import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { mainThemeColor } from '@/constants/Colors';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';

export default function TabLayout() {


  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="sizzle"
        options={{
          title: 'Sizzle',
          tabBarIcon: ({ color }) => <MaterialIcons name="electric-bolt" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="likes"
        options={{
          title: 'Likes',
          tabBarIcon: ({ color }) => <Entypo name="heart" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'LinkUp',
          headerStyle: { backgroundColor: '#000' },
          headerTitleStyle: { color: mainThemeColor },
          tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-sharp" size={24} color={color} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}

const screenOptions = {
  tabBarStyle: {
    backgroundColor: '#000',
    height: 100,
  },
  tabBarItemStyle: {
    margin: 5,
    borderRadius: 10,
  },
  tabBarActiveTintColor: '#f1c40f',
  tabBarInactiveTintColor: '#fff',
};