import axios from 'axios';

const API_URL = '/api/auth';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const signup = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
};
