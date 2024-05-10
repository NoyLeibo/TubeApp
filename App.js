import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import VideoListScreen from './screens/VideoListScreen';
import VideoDetailsScreen from './screens/VideoDetailsScreen';
import VideoSearchScreen from './screens/VideoSearchScreen.js';
import { MyThemes } from './constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');


  useEffect(() => {
    AsyncStorage.getItem('theme').then(storedTheme => {
      console.log(storedTheme);
      setTheme(storedTheme || systemTheme || 'light');
    });
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  }

  function openMenu() { }

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
            <Pressable onPress={toggleTheme} style={styles.btnStyle}>
              <Text style={styles.btnTextStyle}>
                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
              </Text>
            </Pressable>),
          // headerLeft: () => (
          //   <Button onPress={openMenu} title="B" />
          // ),
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
        {/* <Stack.Screen
          name="VideoSearch"
          component={VideoSearchScreen}
          options={{ title: 'Video Search' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    fontWeight: 'bold',
    marginRight: 16,
    padding: 10,
    color: 'white'
  },
  btnTextStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
