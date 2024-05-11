import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation, useTheme } from '@react-navigation/native'; // Import useTheme

const VideoDetailsScreen = ({ route }) => {
    const { videoId, title, description } = route.params // getting params to render 

    const theme = useTheme() // Get current theme from context
    const navigation = useNavigation() // Hook for navigation

    const styles = StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: theme.colors.background, // Use background color from theme
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            color: theme.colors.text, // Use text color from theme
        },
        description: {
            fontSize: 16,
            color: theme.colors.text, // Use text color from theme
        },
        errorText: {
            fontSize: 20,
            color: 'red',
            textAlign: 'center', // Center the text for better visibility
        },
        button: {
            marginTop: 10,
        }
    })

    // Check for missing parameters and navigate back if any are missing
    if (!videoId || !title || !description) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Missing video data. Please go back and select a video.</Text>
                <Button
                    title="Go Back"
                    onPress={() => navigation.goBack()} // Go back to the previous screen
                    color={theme.colors.primary} // Use the primary color from the theme
                />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <YoutubePlayer
                height={300}
                videoId={videoId}
                play={true}
            />
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
};

export default VideoDetailsScreen;
