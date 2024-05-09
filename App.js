import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoListScreen from './screens/VideoListScreen.js';
import VideoDetailsScreen from './screens/VideoDetailsScreen.js';

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
