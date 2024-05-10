import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

function VideoSearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme();
    const textColor = theme.colors.text; // font color based on theme

    useEffect(() => {
        console.log('textColor', theme);
    }, [])

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
    }

    return (
        <View style={[styles.container, { borderBottomColor: textColor }]}>
            <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor }]}
                placeholder="Type here to search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <Text style={[styles.buttonText, { color: textColor }]}>Search</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 20,
        padding: 10,
        borderBottomWidth: 1,
    },
    input: {
        width: '100%',
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 10,
    }
});

export default VideoSearchScreen;
