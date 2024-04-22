// File: pages/api/webhook/reply.ts
import { NextApiRequest, NextApiResponse } from "next";
import neynarClient from '../../../utils/neynarClient';  // Corrected import path
import { Cast as CastV2 } from "@neynar/nodejs-sdk/build/neynar-api/v2/openapi-farcaster/models/cast.js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return await handlePost(req, res);
    } else if (req.method === 'GET') {
        return handleGet(req, res);
    } else {
        res.status(405).send("Method not allowed");
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    if (!process.env.SIGNER_UUID || !process.env.NEYNAR_API_KEY) {
        return res.status(500).json({ error: "Environment variables SIGNER_UUID or NEYNAR_API_KEY are not set." });
    }

    const webhookSecret = req.query.secret;
    if (process.env.WEBHOOK_SECRET !== webhookSecret) {
        return res.status(401).json({ message: "Invalid webhook secret." });
    }

    const hookData = await req.body as {
        created_at: number;
        type: "cast.created";
        data: CastV2;
    };

    try {
        const reply = await neynarClient.publishCast(
            process.env.SIGNER_UUID,
            `Good morning ${hookData.data.author.username}`,
            {
                replyTo: hookData.data.hash,
            }
        );
        console.log("Reply sent:", reply);
        res.status(200).json({ message: reply });
    } catch (error) {
        console.error("Failed to publish cast:", error);
        res.status(500).json({ error: "Failed to process the webhook." });
    }
}

function handleGet(req: NextApiRequest, res: NextApiResponse) {
    // Simple GET request handler to confirm server status
    res.status(200).send("<html><body><h1>Server is running!</h1></body></html>");
}
