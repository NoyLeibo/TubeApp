import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

function SearchButton() {
    const navigation = useNavigation()// Hook to access navigation functionality

    // returns a pressable button that navigates to the VideoSearch screen when pressed
    return (
        <Pressable onPress={() => navigation.navigate('VideoSearch')} style={styles.btnStyle}>
            <Text style={styles.btnTextStyle}>Search</Text>
        </Pressable>
    );
};

//StyleSheet for the SearchButton component
const styles = StyleSheet.create({
    btnStyle: {
        fontWeight: 'bold',
        // margin: 16,
        padding: 10,
        color: 'white'
    },
    btnTextStyle: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default SearchButton