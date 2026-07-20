# Farmroute 

## Prerequisites
- Node.js (14+ recommended)
- npm 
- MongoDB connection string (Atlas or local)
- Optional: Redis (if used), email/send or payment provider keys

## Setup

1. Clone the repo and change directory:
   - git clone <repo-url>
   - cd c:\Users\Son Of Man\Desktop\farmroute

2. Install dependencies:
   - npm install

3. Configure environment variables:
   - Copy or create a `.env` file in the project root and set the values. DO NOT commit secrets to source control.

Example `.env` template (replace placeholders):
```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>

# Auth
JWT_SECRET=<a-strong-secret-without-quotes>
JWT_EXPIRES_IN=1h

# Redis (optional)
REDIS_URL=

# Email (OTP delivery) - optional
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Payments - optional
PAYSTACK_SECRET_KEY=
```

Notes:
- Remove any quotes around JWT_SECRET (plain string).
- Keep secrets out of version control; use a secrets manager in production.

## Run

- Development (typical):
  - npm run dev
- Production (typical):
  - npm start
- If scripts differ, check `package.json` for exact commands.

## Common issues
- Mongo connection errors: verify `MONGO_URI` and network access (IP whitelist for Atlas).
- Port in use: change `PORT` in `.env`.
- Invalid JWT secret/format: ensure `JWT_SECRET` is set and not quoted.

## Next steps (project TODO)
- Finish remaining features and tests.
- Add `.env.example` and CI/deployment instructions.
- Remove any hard-coded sensitive values from repository.

