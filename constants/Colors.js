import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const tintColor = '#2f95dc';

const customColors = {
    loaderColor: "#0000ff",
    primary: '#FF0000', // Red color
    secondary: '#a8d2f0',
    tintColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff',
    headerBackground: '#FF0000', // YouTube Red color
    headerText: '#fff', // White text
};

const MyThemes = {
    light: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: customColors.primary,
            background: 'white',
            card: customColors.headerBackground,
            text: '#000',
            border: customColors.secondary,
        },
    },
    dark: {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: customColors.primary,
            background: 'black',
            card: 'rgb(18, 18, 18)',
            text: '#fff',
            border: customColors.secondary,
        },
    }
};

export { MyThemes, customColors };
