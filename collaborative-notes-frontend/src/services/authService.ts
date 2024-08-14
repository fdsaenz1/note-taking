import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update this URL based on your backend server configuration

// Function to handle user login
export const apiLogin = async (credentials: { email: string, password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // This should include the JWT token
};

// Function to handle user signup
export const apiSignup = async (userData: { email: string, password: string }) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // This should include the JWT token
};

// Function to get the current user's profile (optional, if needed)
export const apiGetProfile = async () => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            'x-auth-token': localStorage.getItem('token') || ''
        }
    });
    return response.data;
};

// Function to logout the user (if needed)
export const apiLogout = () => {
    localStorage.removeItem('token');
};

