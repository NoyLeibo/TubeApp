import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { customColors } from '../constants/Colors';
import { fetchVideosByQuery } from '../services/fetchVideosByQuery';

function VideoSearchScreen({ navigation }) {  // Make sure navigation is passed here if using
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const { colors } = useTheme();

    async function loadVideos() {
        setLoading(true);
        try {
            const fetchedVideos = await fetchVideosByQuery(searchQuery);
            setVideos(fetchedVideos);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    const handleSearch = () => {
        loadVideos();
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error: {error}</Text>
                <Button title="Retry" onPress={loadVideos} />
            </View>
        )
    }

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
        <View style={styles.screen}>
            <View style={[styles.container, { borderBottomColor: colors.text }]}>
                <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                    placeholder="Type here to search..."
                    placeholderTextColor={colors.text}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                    <Text style={[styles.buttonText, { color: colors.text }]}>Search</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator size="large" color={customColors.loaderColor} />}
            {error && <Text style={{ color: customColors.primary }}>{error}</Text>}
            <FlatList
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
