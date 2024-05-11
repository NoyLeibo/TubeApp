import { DefaultTheme, DarkTheme } from '@react-navigation/native';


const customColors = {
    loaderColor: "#0000ff", // Blue color used for loading
    primary: '#FF0000', // Bright red color, used as the main color theme
    secondary: '#a8d2f0', // Light blue color, used for secondary
    tintColor: '#2f95dc', // Light-dark blue color
    borderColor: '#bbbbbb', // Gray color for solid border
    errorText: '#fff', // White color, used for error messages for better visibility against dark backgrounds
    headerBackground: '#FF0000', // Red color, used for light header backgrounds
    headerBackgroundDark: 'rgb(18, 18, 18)', // Red color,used for dark header backgrounds
    headerText: '#fff', // White text, used on headers for the red background
};

const MyThemes = {
    light: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: customColors.primary,
            background: 'white',
            card: customColors.headerBackground,// light card background
            text: '#000', // black text, on light backgrounds.
            border: customColors.secondary,
        },
    },
    dark: {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: customColors.primary,
            background: 'black',
            card: customColors.headerBackgroundDark, // Dark card background
            text: '#fff', // White text, on dark backgrounds.
            border: customColors.secondary,
        },
    }
};

export { MyThemes, customColors };
