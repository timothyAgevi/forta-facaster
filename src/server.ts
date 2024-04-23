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
    // Assuming webhookData may contain a specific webhook_id you might want to override
    const webhookData = req.body;
    console.log('Received webhook:', webhookData);

    // Use the WEBHOOK_ID environment variable or fall back to the provided webhook_id in the request body
    const webhookId = process.env.WEBHOOK_ID || webhookData.webhook_id;

    try {
        const webhookInfo = await fetchWebhook(webhookId);
        console.log('Webhook Info:', webhookInfo);

        const frameResponse = await createFrame({
            name: "New Frame from Webhook",
            pages: [{
                title: "Main Page",
                content: "Content based on webhook data"
            }]
        });

        console.log('Frame created:', frameResponse);
        res.status(200).json(frameResponse);
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Error processing webhook data');
    }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
