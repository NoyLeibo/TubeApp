import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useTheme } from '@react-navigation/native'; // Import useTheme

const VideoDetailsScreen = ({ route }) => {
    const { videoId, title, description } = route.params;

    const theme = useTheme();

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
        }
    });

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
