import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { fetchWebhook, createFrame } from './neynarApi';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is up and running!');
});

app.post('/webhook', async (req: Request, res: Response) => {
    const webhookData = req.body;
    console.log('Received webhook:', webhookData);

    try {
        const webhookInfo = await fetchWebhook(webhookData.webhook_id);
        console.log('Webhook Info:', webhookInfo);

        const frameResponse = await createFrame({
            name: "New Frame from Webhook",
            pages: [{ title: "Main Page", content: "Content based on webhook data" }]
        });

        console.log('Frame created:', frameResponse);
        res.status(200).json(frameResponse);
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Error processing webhook data');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
