import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_KEY = 'AIzaSyCJqoa_yFmh_ICzuulUriz4qFTIjq9hzUQ';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const VIDEOS_KEY = 'videos'

export const fetchVideos = async (query = 'latest videos') => {
    let data = await _getData(VIDEOS_KEY)
    if (data) return data
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: "snippet",
                maxResults: 10,
                key: API_KEY,
                type: 'video',
                q: encodeURIComponent(query)
            }
        });
        _storeData(VIDEOS_KEY, response.data.items)
        console.log('TEXT: ', response);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};

const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("error:", error);
    }
};

const _getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        throw new Error("empty cache");
    } catch (error) {
        console.error("error:", error);
    }
};