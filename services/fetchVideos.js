import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config.json';

const API_KEY = config.google_api_key;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const VIDEOS_KEY = 'videos'

export const fetchVideos = async (query = 'latest videos') => {
    // if (query === 'latest videos') {
    //     let data = await _getData(VIDEOS_KEY)
    //     if (data) return data
    // } // to not fetch new videos every refresh (reason: youtube blocked me for a lot of requests)
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: "snippet",
                maxResults: 10,
                key: API_KEY,
                type: 'video',
                q: query
            }
        });
        // console.log('API Response:', response.data) // this line is to log the response
        // if (query === 'latest videos') _storeData(VIDEOS_KEY, response.data.items)
        return response.data.items
    } catch (error) {
        console.error("Error fetching videos:", error)
        throw error;
    }
};

// Using storeData and getData to stop block from youtbe
async function _storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error("error:", error)
    }
};

async function _getData(key) {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return JSON.parse(value)
        }
        throw new Error("empty cache")
    } catch (error) {
        console.error("error:", error)
    }
};