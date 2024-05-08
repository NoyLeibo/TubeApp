import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoDetailsScreen = ({ route }) => {
    const { videoId, title, description } = route.params;

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

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
    }
});

export default VideoDetailsScreen;
