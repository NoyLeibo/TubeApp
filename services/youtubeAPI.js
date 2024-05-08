import axios from 'axios';

const API_KEY = 'AIzaSyBc_uT_p0WT9LtLV7MBsRPkYRT5eSUTvXI';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (query = 'latest videos') => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                maxResults: 10,
                key: API_KEY,
                type: 'video',
                q: encodeURIComponent(query)
            }
        });
        return response.data.items;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};
