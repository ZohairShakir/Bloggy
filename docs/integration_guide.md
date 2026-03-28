# Multi-Platform Integration Guide

This document provides instructions on how to connect **Bloggy** to the five approved publishing platforms for genuine one-click distribution.

## 1. Medium Integration
To distribute to Medium, you need an **Integration Token**.
1. Log in to your Medium account.
2. Go to **Settings** > **Security and apps** > **Integration tokens**.
3. Generate a new token and name it "Bloggy".
4. **Integration**: Add this token to your `.env` file as `MEDIUM_API_KEY`.

## 2. LinkedIn Integration
LinkedIn requires an **OAuth 2.0 App**.
1. Go to the [LinkedIn Developers Portal](https://www.linkedin.com/developers/).
2. Create a new App and request the `w_member_social` permission.
3. Obtain your `Client ID` and `Client Secret`.
4. **Integration**: Use these credentials to implement the OAuth flow. In a simplified setup, you can use a **Member Directory Token**.

## 3. WordPress.com Integration
WordPress.com supports **Application Passwords**.
1. Log in to your WordPress.com site.
2. Go to **Users** > **Profile**.
3. Scroll to **Application Passwords** and create a new one named "Bloggy".
4. **Integration**: Use your username and this application password for Basic Auth against the WordPress REST API.

## 4. Blogger Integration
Blogger uses the **Google Discovery API**.
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and enable the **Blogger API v3**.
3. Create **OAuth 2.0 Client IDs**.
4. **Integration**: Add your credentials to the backend. Since you are already using Google (Gemini), you can use the same Google Cloud project.

## 5. Substack Integration
Substack does not have an official public API, but it supports **Email-to-Post** or **RSS-to-Post** automation via tools like Zapier or Make.com.
1. Find your Substack "Secret Email" in your dashboard (if available).
2. **Integration**: Configure the Bloggy distribution bureau to send the final manuscript to your Substack email address or a designated Webhook.

---

### Implementation Note
The current version of Bloggy uses a **Simulation Bureau** that prepares the payload for these platforms. To enable real publishing, you would need to update the `backend/server.js` file's `/api/distribute` endpoint to use the respective SDKs (e.g., `medium-sdk-nodejs`, `googleapis`, etc.).
