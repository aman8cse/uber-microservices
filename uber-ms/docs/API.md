# API Reference

This project exposes several HTTP endpoints through the gateway and service apps.

## Gateway routes

### User service
- `POST /user/register`
- `POST /user/login`
- `POST /user/logout`
- `GET /user/profile`

### Captain service
- `POST /captain/register`
- `POST /captain/login`
- `POST /captain/logout`
- `GET /captain/profile`
- `PATCH /captain/toggle-availibility`

### Ride service
- `POST /ride/create-ride`

## Example payloads

### Register user

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Register captain

```json
{
  "name": "Captain Smith",
  "email": "captain@example.com",
  "password": "secret123"
}
```

### Create ride

```json
{
  "pickup": "Downtown",
  "destination": "Airport"
}
```

## Authentication

Most protected routes expect a valid JWT token in a cookie named `token` or in the `Authorization` header as a bearer token.

Example header:

```http
Authorization: Bearer <token>
```

## Response conventions

The app is currently returning simple JSON responses with status codes and message fields. Production versions should add:

- consistent error schema
- validation error payloads
- pagination metadata when applicable
- correlation IDs
- audit logs

## Notes

This API is a backend learning example for microservice interactions. It is intentionally minimal and may not yet cover all production API concerns.
