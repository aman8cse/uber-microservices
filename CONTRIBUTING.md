# Contributing

Thanks for considering contributing to this project.

## Development workflow

1. Fork the repository.
2. Create a feature branch.
3. Keep changes focused and reviewable.
4. Run the relevant checks locally.
5. Submit a pull request with a clear summary.

## Code standards

- write clear, readable JavaScript
- keep service boundaries consistent
- favor small, focused changes
- add or update documentation when behavior changes
- avoid hardcoded secrets in source control

## Environment requirements

- Node.js 18+
- MongoDB
- RabbitMQ
- a local `.env` configuration per service

## Pull request guidance

Include:

- what changed
- why it was needed
- any setup steps or migration notes
- testing or verification performed

## Security

Do not commit secrets, tokens, or real credentials. Use environment variables and secure secret management in deployment environments.
