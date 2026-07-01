# Backend deployment notes

## Render
- Set the following environment variables in Render:
  - PORT
  - SMTP_HOST
  - SMTP_PORT
  - SMTP_USER
  - SMTP_PASS
  - EMAIL_FROM
  - EMAIL_TO
- Build command: npm install && npm run build
- Start command: npm start

## Vercel
- Add a frontend environment variable:
  - VITE_API_URL=https://your-render-app.onrender.com/api
