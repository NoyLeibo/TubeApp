import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchVideos } from '../services/youtubeAPI';
import { useNavigation } from '@react-navigation/native';

const VideoListScreen = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            try {
                const fetchedVideos = await fetchVideos();
                setVideos(fetchedVideos);
                setError(null);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        loadVideos();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('VideoDetails', {
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description
        })}>
            <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.snippet.title}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            {!loading && !error && (
                <FlatList
                    data={videos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.videoId}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    thumbnail: {
        width: 100,
        height: 100,
    },
    title: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default VideoListScreen;
