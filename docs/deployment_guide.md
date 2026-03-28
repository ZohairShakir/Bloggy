# Bloggy AI: Strategic Deployment Handbook

This document provides definitive protocols for deploying the Bloggy AI **Laboratory Bureau** from the local development workspace to a global production environment.

---

## I. Preparation & Security
Before beginning deployment, you must synchronize your environment variables across service providers.

### Backend Bureau (Express)
Create an environment file or set these directly in your deployment provider's dashboard:
- `GEMINI_API_KEY`: Your proprietary Google Generative AI key.
- `PORT`: (Optional) Node.js will default to `5000` unless your host overrides it.
- `CORS_ORIGIN`: Set this to your frontend URL to restrict access to authorized operatives.

### Frontend Lab (React/Vite)
Create a `.env.production` in the `/frontend` directory:
- `VITE_API_URL`: The absolute HTTPS URL of your deployed backend service.

---

## II. Deployment Frameworks

### Option Alpha: Independent Service Scaling (Recommended)
Deploying the frontend and backend as separate services allows for individual scaling and high uptime.

#### **Backend Deployment (Render / Railway / Render)**
1. **Source Directory**: `/backend`
2. **Build Instruction**: `npm install`
3. **Execution Command**: `npm start`
4. **Environment Protocols**: Ensure `GEMINI_API_KEY` is active in the provider settings.

#### **Frontend Deployment (Vercel / Netlify)**
1. **Source Directory**: `/frontend`
2. **Build Instruction**: `npm run build`
3. **Dist Output**: `dist`
4. **Environment Protocols**: Set `VITE_API_URL` to point to the backend service.

> [!IMPORTANT]
> Because Vite proxies only operate in **Development State**, ensure all API calls in your production code use the absolute `VITE_API_URL` path.

---

### Option Beta: Monolithic Deployment (Unified Bureau)
Combine the frontend and backend into a single service for simplified management.

1. **Protocol Execution**: Build the frontend locally using `npm run build`.
2. **Component Integration**: Copy the content of `/frontend/dist` into `/backend/public`.
3. **Server Configuration**: Update `/backend/server.js` to serve these static files:
   ```javascript
   const path = require('path');
   app.use(express.static(path.join(__dirname, 'public')));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });
   ```
4. **Final Deployment**: Deploy only the `/backend` folder to a Node.js cloud provider.

---

## III. Verification Protocols
Once deployment is complete, verify the integrity of the following bureaus:

1. **Auth Access**: Register a test operative and verify session persistence.
2. **Synthesis Chain**: Execute an **Audit Inquiry**. If scores of "0" or "Error" appear, verify the `GEMINI_API_KEY` status.
3. **Archive Persistence**: **WARNING:** Current persistence is in-memory. Data will purge on service restart. For high-authority production, bridge to a MongoDB or PostgreSQL archive.

---

> [!NOTE]
> For any operational failures during deployment, consult the `docs/integration_guide.md` or contact Bureau Intelligence Support.
