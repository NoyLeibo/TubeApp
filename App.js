import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, useColorScheme } from 'react-native';
import VideoListScreen from './screens/VideoListScreen';
import VideoDetailsScreen from './screens/VideoDetailsScreen';
import { MyThemes } from './constants/Colors';

const Stack = createStackNavigator();

function App() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  const toggleTheme = () => {
    setTheme(theme => theme === 'light' ? 'dark' : 'light');
  };

  return (
    <NavigationContainer theme={MyThemes[theme]}>
      <Stack.Navigator
        initialRouteName="VideoList"
        screenOptions={{
          headerStyle: {
            backgroundColor: MyThemes[theme].colors.card,
          },
          headerTintColor: MyThemes[theme].colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Button onPress={toggleTheme} title="Toggle Theme" />
          ),
        }}>
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
