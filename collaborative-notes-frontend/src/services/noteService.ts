import axios from 'axios';

const API_URL = '/api/notes';

export const getNotes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createNote = async (note: { title: string; content: string }) => {
    const response = await axios.post(API_URL, note);
    return response.data;
};

export const updateNote = async (note: { id: string; title: string; content: string }) => {
    const response = await axios.put(`${API_URL}/${note.id}`, note);
    return response.data;
};

export const deleteNote = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};
