import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export function HomeScreen({ route }) {
    const navigation = useNavigation()
    const { text } = route.params;
    const [contacts, setContacts] = useState([
        { _id: '1', name: 'John Doe', phone: '123-456-7890' },
        { _id: '2', name: 'Jane Smith', phone: '234-567-8901' },
        { _id: '3', name: 'Alice Johnson', phone: '345-678-9012' },
        // Add more contacts here
    ]);
    console.log('text', text);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                alwaysBounceVertical={false}
            />
            <Button
                title='Go to About'
                onPress={() => navigation.navigate("About", { name: text })}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 20,
    },
    itemContainer: {
        backgroundColor: 'lightgray',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    phone: {
        fontSize: 16,
    },
})
