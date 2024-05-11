import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeProvider';// import useTheme hook from ThemeProvider context

function ThemeButton() {
    const { theme, toggleTheme } = useTheme() // Retrieve current theme and function to toggle theme

    // Return a pressable button that toggles between light and dark themes
    return (
        <Pressable onPress={toggleTheme} style={styles.btnStyle}>
            <Text style={styles.btnTextStyle}>
                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Text>
        </Pressable>
    );
};

// styles for the button
const styles = StyleSheet.create({
    btnStyle: {
        fontWeight: 'bold',
        padding: 10,
        color: 'white'
    },
    btnTextStyle: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ThemeButton