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
import { customColors } from '../constants/Colors';
import { fetchVideos } from '../services/fetchVideos';

function VideoSearchScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const { colors } = useTheme(); // for using text color
    const timerRef = useRef(null); // useRef to hold the timer for debouncing

    useEffect(() => { // if there's a timer exists, it'll stop him when the cmp wil turn on
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    async function loadVideos(text = searchQuery) { // load videos by the text and setState them
        setLoading(true);
        try {
            const fetchedVideos = await fetchVideos(text);
            setVideos(fetchedVideos);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
        console.log('got result for: ', text);
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

    const renderItem = ({ item }) => (
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

    if (error) { // only if there's error exists from API
        return (
            <View style={styles.centered}>
                <Text>Error: {error}</Text>
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
