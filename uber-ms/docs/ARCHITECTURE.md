# Architecture Overview

## High-level design

The project follows a modular microservice style with independent application services for each domain area. The gateway acts as the public entry point, while backend services handle domain logic and data access.

```text
Client
  |
  v
Gateway (port 3000)
  |----------------------------------------------
  |                |                 |
  v                v                 v
User Service     Captain Service     Ride Service
  |                |                 |
  |---- MongoDB ---|--- MongoDB ---|--- MongoDB
  |                |                 |
  +----- RabbitMQ Event Bus ------------------+
```

## Service responsibilities

### User service
- handles user sign-up and sign-in
- issues JWT tokens
- manages user profile access
- maintains blocked token list for logout

### Captain service
- handles captain sign-up and sign-in
- manages availability state
- exposes captain-only profile routes
- subscribes to ride events from RabbitMQ

### Ride service
- creates ride records
- attaches rider identity and route details
- publishes new-ride events to RabbitMQ

### Gateway service
- routes `/user`, `/captain`, and `/ride` traffic to the correct service
- provides a single access point for clients

## Communication patterns

### Synchronous
- HTTP requests from gateway to service endpoints
- direct auth validation for protected endpoints
- services communicate with MongoDB using Mongoose models

### Asynchronous
- RabbitMQ is used for domain events such as `new-ride`
- the captain service listens for ride events and can process or react to them

## Authentication model

- JWT tokens are generated during login/register
- tokens are stored in cookies on the client side
- middleware validates tokens and current user/captain identity
- blacklist tokens are stored in MongoDB for logout invalidation

## Data model summary

### User
- name
- email
- password
- profile metadata as needed later

### Captain
- name
- email
- password
- isAvailable

### Ride
- rider
- from
- to
- created timestamps and additional ride metadata can be added as needed

## Production considerations

This architecture is intentionally simple and suitable for learning. A production-ready version would add:

- API versioning
- centralized auth service
- service discovery and config management
- tracing and logs
- retries and DLQs for RabbitMQ
- containerization with Docker
- load balancers and auto-scaling
- secure secrets storage
