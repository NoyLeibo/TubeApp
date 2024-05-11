// Imports and setup for the React environment and navigation.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeProvider, { useTheme } from './contexts/ThemeProvider';  // import theme context for theme management
import VideoListScreen from './screens/VideoListScreen';
import VideoDetailsScreen from './screens/VideoDetailsScreen';
import VideoSearchScreen from './screens/VideoSearchScreen';
import { MyThemes } from './constants/Colors';  // import theme data
import ThemeButton from './cmps/ThemeButton';    // import button for changing themes
import SearchButton from './cmps/SearchButton';  // import button for search functionality

// create a stack navigator to handle navigation between screens
const Stack = createStackNavigator()

// main app component that wraps app component in a ThemeProvider for theme context
function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  )
}

//main app component that defines the main navigation
function MainApp() {
  const { theme } = useTheme()  //get the current theme context

  return (
    <NavigationContainer theme={MyThemes[theme]}> {/*Apply the current theme to the navigation container */}
      <Stack.Navigator
        initialRouteName="VideoList" //Set the default screen of the stack
        screenOptions={{
          headerStyle: {
            backgroundColor: MyThemes[theme].colors.card, //dynamic header background based on the theme
          },
          headerTintColor: MyThemes[theme].colors.text, //dynamic text color for the header
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerRight: () => <ThemeButton />  //Render theme toggle button on the header
        }}
      >
        <Stack.Screen
          name="VideoList"
          component={VideoListScreen}
          options={{
            title: 'Video List',  //Title for the VideoList screen
            headerLeft: () => <SearchButton />  // Render search button on the left side of the header
          }}
        />
        <Stack.Screen
          name="VideoDetails"
          component={VideoDetailsScreen}
          options={{ title: 'Video Details' }}  // Title for the VideoDetails screen
        />
        <Stack.Screen
          name="VideoSearch"
          component={VideoSearchScreen}
          options={{ title: 'Video Search' }}  // Title for the VideoSearch screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Export the app component
export default App;
