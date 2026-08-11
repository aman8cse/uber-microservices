# Uber Microservices

A Node.js microservices-based ride-hailing sample built with Express, MongoDB, JWT authentication, and RabbitMQ.

## Project purpose

This project models a simplified Uber-like flow with separate services for users, captains, and rides. A gateway proxies requests into the correct service, while RabbitMQ handles async event communication.

## Services

- `user/` — user registration, login, logout, and profile
- `captain/` — captain registration, login, availability toggling, and profile
- `ride/` — ride creation and ride-related workflow
- `gateway/` — single entry point for routing requests to the internal services

## Core stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- RabbitMQ via `amqplib`
- cookie-based token flow for protected routes

## Folder structure

```text
uber-ms/
├── captain/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── package.json
│   └── server.js
├── gateway/
│   ├── app.js
│   └── package.json
├── ride/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── package.json
│   └── server.js
├── user/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── package.json
│   └── server.js
├── .env.example
├── .gitignore
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   └── API.md
└── README.md
```

## Quick start

1. Create a MongoDB instance.
2. Create a RabbitMQ instance.
3. Copy `.env.example` to a local `.env` file in each service folder as needed.
4. Install dependencies in each service:

```bash
cd user && npm install
cd ../captain && npm install
cd ../ride && npm install
cd ../gateway && npm install
```

5. Start each service:

```bash
cd user && npm run dev
cd ../captain && npm run dev
cd ../ride && npm run dev
cd ../gateway && npm run dev
```

6. Use the gateway on port `3000`:

```text
http://localhost:3000
```

## Default gateway routes

- `/user/*` -> user service
- `/captain/*` -> captain service
- `/ride/*` -> ride service

## Important notes

This project is structured as a backend microservices learning app, not a full production deployment blueprint. It demonstrates service boundaries and messaging patterns, but production improvements are still recommended.

For more detail, see:

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/SETUP.md](docs/SETUP.md)
- [docs/API.md](docs/API.md)
