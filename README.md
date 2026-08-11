# Microservices Playground

This repository contains a small microservices-based learning project for an Uber-like platform, along with a lightweight stress-testing utility.

## Repository structure

- `uber-ms/` — primary microservices application
- `stress-testing/` — basic Express-based load/stress testing app

## Overview

The `uber-ms` application demonstrates a simplified ride-sharing architecture with separate services for:

- User management
- Captain management
- Ride creation and workflow
- API gateway routing
- RabbitMQ-based asynchronous messaging
- MongoDB persistence

The project is intended as a reference implementation and starter for learning service boundaries, authentication, and inter-service communication.

## Quick start

1. Install Node.js 18+ and MongoDB.
2. Install RabbitMQ.
3. Configure environment variables from the service examples.
4. Start each service in its own terminal.
5. Run the gateway to access the platform through a single entry point.

See the application docs in `uber-ms/README.md` and the guides under `uber-ms/docs/` for exact setup steps.

## Production suitability note

This is a practical service-oriented code sample and should be treated as a starting point for production work. Before deploying publicly, review the following:

- add environment-based secrets management
- improve validation and error handling
- add health checks and monitoring
- implement CI/CD and automated tests
- secure inter-service communication and rate limiting
- add service discovery and deployment orchestration

## License

This project is provided for educational and demonstration purposes.
