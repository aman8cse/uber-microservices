# Setup Guide

## Prerequisites

- Node.js 18 or newer
- MongoDB running locally or remotely
- RabbitMQ running locally or remotely
- Git
- A terminal for starting each service

## 1. Clone and install

```bash
git clone <your-repo-url>
cd microservices

cd uber-ms/user && npm install
cd ../captain && npm install
cd ../ride && npm install
cd ../gateway && npm install
```

## 2. Configure environment variables

Create a `.env` file in each service folder using the values from `.env.example` in `uber-ms/` as a guide.

Example for `user`:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/uber-user
JWT_SECRET=supersecretjwtkey
AMQP_URL=amqp://localhost
```

Example for `captain`:

```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/uber-captain
JWT_SECRET=supersecretjwtkey
AMQP_URL=amqp://localhost
```

Example for `ride`:

```env
PORT=3003
MONGO_URI=mongodb://localhost:27017/uber-ride
JWT_SECRET=supersecretjwtkey
AMQP_URL=amqp://localhost
```

Gateway can also be configured separately if needed:

```env
PORT=3000
```

## 3. Start infrastructure

Make sure MongoDB and RabbitMQ are up before launching the services.

- MongoDB: `mongodb://localhost:27017`
- RabbitMQ: `amqp://localhost`

## 4. Start the services

Run each service in a separate terminal:

```bash
cd uber-ms/user && npm run dev
cd uber-ms/captain && npm run dev
cd uber-ms/ride && npm run dev
cd uber-ms/gateway && npm run dev
```

## 5. Verify health checks

Check service health endpoints:

```bash
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3003/health
curl http://localhost:3000/health
```

The gateway does not currently include a dedicated health route, but it can be extended as needed.

## 6. Common troubleshooting

- `MongoDB connection error`: confirm your `MONGO_URI` and MongoDB server status
- `RabbitMQ connection error`: confirm the AMQP URL and RabbitMQ is running
- `Unauthorized`: verify cookie/token propagation and JWT secret alignment
- `EADDRINUSE`: another process is already using the service port

## Production hardening checklist

- move secrets to environment management or vaults
- add Dockerfiles and docker-compose
- add health checks and readiness probes
- add automated test suite and linting
- enable logs and observability
- secure public API endpoints with rate limiting and CORS policies
