import axios from 'axios';

const API_KEY = 'AIzaSyCJqoa_yFmh_ICzuulUriz4qFTIjq9hzUQ'
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

// This function fetches the first 10 videos based on a search query from YouTube
export const fetchVideosByQuery = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                maxResults: 10,
                key: API_KEY,
                type: 'video',
                q: query
            }
        })
        return response.data.items
    } catch (error) {
        console.error("Error fetching videos:", error) // Logs the error to the console
        throw error
    }
};
