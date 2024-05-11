import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Button, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchVideos } from '../services/fetchVideos';  //fetch videos from the API file
import { customColors } from '../constants/Colors';// Custom color constants

const VideoListScreen = () => {
    const [videos, setVideos] = useState([]) // State to store fetched videos
    const [refreshing, setRefreshing] = useState(false)   // state to track refreshing status
    const [loading, setLoading] = useState(false)  // state to track loading status
    const [error, setError] = useState(null) // State to store errors
    const navigation = useNavigation()

    useEffect(() => {
        loadVideos()
    }, []) //load videos on component mount

    function onRefresh() {
        setRefreshing(true)
        loadVideos().then(() => {
            setRefreshing(false)
        })
    } // handle the pull-to-refresh action

    async function loadVideos() {
        setLoading(true) // will make the loading on screen
        try {
            const fetchedVideos = await fetchVideos() // fetch videos from the API
            setVideos(fetchedVideos) // update the videos state
            setError(null)// clear errors because fetch is successful
        } catch (err) {
            setError(err.message) // Set the error state if catched
        }
        setLoading(false)
    } //fetch videos with no query by latest videos and update state 

    const renderItem = ({ item }) => (  // Render function for each video item
        // if clicked on video will move to details video with params
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('VideoDetails', {
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description
        })}>
            <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.snippet.title}</Text>
        </TouchableOpacity>
    )


    if (error) { // render this error and retry button if there is an error
        return (
            <View style={styles.centered}>
                <Text style={{ color: 'red' }}>Error: {error}</Text>
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
        borderTopWidth: 1,
        borderTopColor: customColors.borderColor,
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
