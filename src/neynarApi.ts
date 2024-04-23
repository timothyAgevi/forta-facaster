import axios from 'axios';
import { Response } from 'express';

const API_KEY = process.env.NEYNAR_API_KEY;
const API_BASE_URL = 'https://api.neynar.com/v2/farcaster';

export const fetchWebhook = async (webhookId: string): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/webhook`, {
        params: { webhook_id: webhookId, api_key: API_KEY }
    });
    return response.data;
};

export const createFrame = async (data: any): Promise<any> => {
    const response = await axios.post(`${API_BASE_URL}/frame`, data, {
        headers: { 'Content-Type': 'application/json', 'api_key': API_KEY }
    });
    return response.data;
};
