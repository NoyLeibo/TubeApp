import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

function SearchButton({ navigateToSearch }) {
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate('VideoSearch')} style={styles.btnStyle}>
            <Text style={styles.btnTextStyle}>Search</Text>
        </Pressable>
    );
};

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