# Fortra Scam Alert Farcaster Bot

## Overview

The Scam Alert Farcaster Bot is an automated tool that integrates with the Fortas Scam Detection Feed to inform users of potential scams. It subscribes to webhook alerts for detected scams and presents the information in a human-readable format on Farcaster, ensuring that users are promptly alerted to suspicious activity.

## How It Works

1. **Subscription to Scam Detection Feed**
   - The bot subscribes to the Fortas Scam Detection Feed, leveraging its webhook mechanism to receive updates.

2. **Webhook Alert Fetching**
   - Using the Neynar Fetch Webhook API, the bot retrieves scam alerts from Fortas.
   - API Reference: [Neynar Fetch Webhook API](https://docs.neynar.com/reference/lookup-webhook)

3. **Frame Creation on Farcaster**
   - With the Neynar Create Frame API, the bot then creates a frame on Farcaster to display the alert.
   - API Reference: [Neynar Create Frame API](https://docs.neynar.com/reference/publish-neynar-frame)

## Bot Identification
- **Bot ID**: `0x1d646c4045189991fdfd24a66b192a294158b839a6ec121d740474bdacb3ab23`

## Alert Presentation
The bot attaches an image to the frame for a visual cue of the scam alert and structures the information to be easily readable.

> **Note**: The image used for the alert presentation can be seen in the repository's 'images' directory.

## Setup and Configuration

To set up the Scam Alert Farcaster Bot, run the following commands:

```bash
npm build
npm run start
##Video demo
[demo](https://www.loom.com/share/111c26e6d6b544d6bc00896b3299a89b?sid=8631ba4b-ff8d-44db-845f-c5ff5a00f99b)

##License
MIT

##Contributions
We welcome contributions from the community. If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.
License
