import { NextRequest, NextResponse } from "next/server";
import neynarClient from "../../neynarClient";
import { Cast as CastV2 } from "@neynar/nodejs-sdk/build/neynar-api/v2/openapi-farcaster/models/cast.js";

// This function will handle both GET and POST requests
export default async function handler(req: NextRequest) {
    if (req.method === 'POST') {
        return handlePost(req);
    } else if (req.method === 'GET') {
        return handleGet(req);
    } else {
        return new Response("Method not allowed", { status: 405 });
    }
}

async function handlePost(req: NextRequest) {
    if (!process.env.SIGNER_UUID || !process.env.NEYNAR_API_KEY) {
        throw new Error("Make sure you set SIGNER_UUID and NEYNAR_API_KEY in your .env file");
    }

    const webhookSecret = req.nextUrl.searchParams.get("secret");
    if (process.env.WEBHOOK_SECRET !== webhookSecret) {
        return NextResponse.json({ message: "invalid webhook" }, { status: 401 });
    }

    const hookData = (await req.json()) as {
        created_at: number;
        type: "cast.created";
        data: CastV2;
    };

    const reply = await neynarClient.publishCast(
        process.env.SIGNER_UUID,
        `gm ${hookData.data.author.username}`,
        {
            replyTo: hookData.data.hash,
            // embeds: [{ url: frame.link }],
        }
    );
    console.log("reply:", reply);

    return NextResponse.json({
        message: reply,
    });
}

function handleGet(req: NextRequest) {
    // Simple GET request handler to confirm server status
    return new Response(
        `<html><body><h1>Server is running!</h1></body></html>`, 
        {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            }
        }
    );
}
