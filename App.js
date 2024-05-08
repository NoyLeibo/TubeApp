import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoListScreen from './cmps/VideoListScreen.js';
import VideoDetailsScreen from './cmps/VideoDetailsScreen.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VideoList">
        <Stack.Screen name="VideoList" component={VideoListScreen} options={{ title: 'Video List' }} />
        <Stack.Screen name="VideoDetails" component={VideoDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
