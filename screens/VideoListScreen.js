import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Button, RefreshControl } from 'react-native';
import { fetchVideos } from '../services/youtbeLatestVideosAPI';
import { useNavigation } from '@react-navigation/native';
import { customColors } from '../constants/Colors';

const VideoListScreen = () => {
    const [videos, setVideos] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        loadVideos()
    }, [])

    function onRefresh() {
        setRefreshing(true)
        loadVideos().then(() => {
            setRefreshing(false)
        })
    }

    async function loadVideos() {
        setLoading(true)
        try {
            const fetchedVideos = await fetchVideos()
            setVideos(fetchedVideos)
            setError(null)
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity TouchableOpacity style={styles.item} onPress={() => navigation.navigate('VideoDetails', {
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description
        })}>
            <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.snippet.title}</Text>
        </TouchableOpacity>
    );

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error: {error}</Text>
                <Button title="Retry" onPress={loadVideos} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color={customColors.loaderColor} />}
            {!loading && (
                <FlatList
                    data={videos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.videoId}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[customColors.loaderColor]}
                            tintColor={customColors.loaderColor} />}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: customColors.secondary,
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
        color: customColors.primary,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default VideoListScreen
