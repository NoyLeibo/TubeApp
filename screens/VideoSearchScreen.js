import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ThemeButton from '../cmps/ThemeButton';

function VideoSearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Add the search functionality here
        console.log('Searching for:', searchQuery);
    }

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Type here to search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button
                    title="Search"
                    onPress={handleSearch}
                />
            </View>
            {/* render here the input search */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 20,
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1, // Set the border width to 1
        // width: '80%',
    },
    input: {
        color: 'red', // Text color for the input field
        width: '100%',
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ddd'
    }
});


export default VideoSearchScreen;
