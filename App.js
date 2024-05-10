import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoListScreen from './screens/VideoListScreen';
import VideoDetailsScreen from './screens/VideoDetailsScreen';
import VideoSearchScreen from './screens/VideoSearchScreen';
import { MyThemes } from './constants/Colors';
import ThemeButton from './cmps/ThemeButton';
import SearchButton from './cmps/SearchButton';
import ThemeProvider, { useTheme } from './contexts/ThemeProvider';

const Stack = createStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme } = useTheme();

  function navigateToSearch() {
    console.log('Search Page');
  }

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
          headerTitleAlign: 'center', // Ensure the title is centered
          headerRight: () => <ThemeButton />
        }}
      >
        <Stack.Screen
          name="VideoList"
          component={VideoListScreen}
          options={{
            title: 'Video List',
            headerLeft: () => <SearchButton navigateToSearch={navigateToSearch} />
          }}
        />
        <Stack.Screen
          name="VideoDetails"
          component={VideoDetailsScreen}
          options={{ title: 'Video Details' }}
        />
        <Stack.Screen
          name="VideoSearch"
          component={VideoSearchScreen}
          options={{ title: 'Video Search' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
