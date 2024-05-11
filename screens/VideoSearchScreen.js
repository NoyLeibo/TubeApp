import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image,
    Button
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { customColors } from '../constants/Colors'; // Custom color constants
import { fetchVideos } from '../services/fetchVideos'; //fetch videos from the API file

function VideoSearchScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState(''); // state to store the search query input by the user
    const [loading, setLoading] = useState(false); // state to track loading status
    const [videos, setVideos] = useState([]); // State to store fetched videos
    const [error, setError] = useState(null);  // State to store errors
    const { colors } = useTheme(); // for using text color
    const timerRef = useRef(null); // useRef to hold the timer for debouncing

    useEffect(() => { // clear the timer on component unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current) // clear any existing timer
            }
        };
    }, []);

    async function loadVideos(text = searchQuery) { // function to load videos based on the search query
        setLoading(true) // will make the loading on screen
        try {
            const fetchedVideos = await fetchVideos(text) // fetch videos from the API
            setVideos(fetchedVideos) // update the videos state
            setError(null) // clear errors because fetch is successful
        } catch (err) {
            setError(err.message) // Set the error state if catched
        }
        setLoading(false) // will turn off the loading bar
    }

    function handleSearch() { // will loadsVideos after clicking Search
        loadVideos();
    }

    function handleInputChange(text) { // this function will loadVideos after user stop typing for 1sec
        setSearchQuery(text);
        if (timerRef.current) { // if there's a timer exists, it'll stop him before start a new one
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            loadVideos(text);
        }, 1000); // Set a new timer to call loadVideos after 1 second
    };

    const renderItem = ({ item }) => ( // Render function for each video item
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
                <Button title="Retry" onPress={loadVideos} /> {/* Rerty to loadVideos again */}
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={[styles.container, { borderBottomColor: colors.text }]}>
                <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                    placeholder="Type here to search..."
                    placeholderTextColor={colors.text}
                    value={searchQuery}
                    onChangeText={handleInputChange}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                    <Text style={[styles.buttonText, { color: colors.text }]}>Search</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator size="large" color={customColors.loaderColor} />}
            {error && <Text style={{ color: customColors.primary }}>{error}</Text>}
            <FlatList // render all videos list
                data={videos}
                renderItem={renderItem}
                keyExtractor={item => item.id.videoId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        padding: 10,
    },
    input: {
        width: '100%',
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        paddingVertical: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
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
        margin: 'auto',
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

export default VideoSearchScreen;
