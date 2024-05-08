import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export function AboutScreen({ route, navigation }) {
    const { name } = route.params;
    console.log(route);
    const [text, setText] = useState(name);

    // Function to handle the name change using setParams
    const handleChangeName = () => {
        navigation.setParams({ name: text });
    };

    return (
        <View style={styles.container}>
            <Text>About Screen {name}</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="Enter new name"
            />
            <Button title='Change the name' onPress={handleChangeName} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        height: 40,
        width: '100%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});
