import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// Create context
const ThemeContext = createContext();

// Provider component
const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme || 'light');

    useEffect(() => {
        AsyncStorage.getItem('theme').then(storedTheme => {
            setTheme(storedTheme || systemTheme || 'light');
        });
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        AsyncStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
