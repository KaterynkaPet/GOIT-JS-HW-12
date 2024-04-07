import axios from 'axios';

import { startPage } from '../main';
import { limitPage } from '../main';
   
export async function getImages(query, page) {
    const url = 'https://pixabay.com/api/';
    const params = {
        key: '43037018-42eeb016e636e06528ba4e47a',
        q: query,
        image_type: 'photo',
        orientation: 'horisontal',
        safesearch: 'true',
        page: startPage,
        per_page: limitPage,
    };
    
    const res = await axios.get(url, { params });
    return res.data; 
};

 