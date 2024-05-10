import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeProvider';

function ThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Pressable onPress={toggleTheme} style={styles.btnStyle}>
            <Text style={styles.btnTextStyle}>
                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        fontWeight: 'bold',
        // marginRight: 16,
        padding: 10,
        color: 'white'
    },
    btnTextStyle: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ThemeButton