import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoListScreen from './screens/VideoListScreen';
import VideoDetailsScreen from './screens/VideoDetailsScreen';
import Colors from './constants/Colors'; // Adjust the path as necessary

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="VideoList"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.headerBackground, // Use the header background color
          },
          headerTintColor: Colors.headerText, // Use the header text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="VideoList"
          component={VideoListScreen}
          options={{ title: 'Video List' }}
        />
        <Stack.Screen
          name="VideoDetails"
          component={VideoDetailsScreen}
          options={{ title: 'Video Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
