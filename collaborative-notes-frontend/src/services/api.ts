
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes'; // Adjust to your backend URL

export const getNotes = async () => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const createNote = async (note: { title: string; content: string }) => {
    await axios.post(API_URL, note, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export const updateNote = async (id: string, note: { title: string; content: string }) => {
    await axios.put(`${API_URL}/${id}`, note, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};
