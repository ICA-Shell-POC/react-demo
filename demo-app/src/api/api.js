// src/api.js
import { API_ENDPOINT } from "../constants/constant";
// src/api.js// src/api.js
export const fetchData = async () => {
    try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Process the data to extract keys and values
        // const labels = Object.keys(data[0]);
        // const values = data.map(item => Object.values(item));
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};