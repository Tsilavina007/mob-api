# Posu API

## Libraries

- prisma
- swagger-ui-express
- openapitools
- bcryptjs

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy the example environment file and fill in your values:
   ```bash
   cp .env.example .env
   ```
4. Start a local PostgreSQL instance (e.g., via Docker):
   ```bash
   docker run --name mob-api-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mob_api -p 5432:5432 -d postgres:16
   ```
5. Run migrations: `npm run migrate:dev`
6. Start the dev server: `npm run dev`

The API documentation is available at [`http://localhost:8080/api-docs`](http://localhost:8080/api-docs) after starting the app.

To inspect the database visually, run: `npm run studio`

## Environment Variables

| Variable       | Description                                       | Example                                                          |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                      | `postgresql://postgres:postgres@localhost:5432/mob_api?schema=public` |
| `JWT_SECRET`   | Secret used to sign JWT tokens                    | `supersecret`                                                    |
| `NODE_ENV`     | Application environment                           | `development` / `production`                                     |
| `PORT`         | Port the API listens on (default: `8080`)         | `8080`                                                           |

See [`.env.example`](.env.example) for a full template.

## Deployment on Render

This repository includes a [`render.yaml`](render.yaml) that provisions:
- A **Node.js web service** running the compiled TypeScript app
- A **PostgreSQL database** (free tier)

### Steps

1. Push the repository to GitHub.
2. In the [Render dashboard](https://dashboard.render.com/), click **New → Blueprint** and connect your repository.
3. Render will detect `render.yaml` and automatically create the service and database.
4. A `JWT_SECRET` is auto-generated. Override it in the Render environment settings if needed.

### Production scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run build`      | Compile TypeScript to `dist/`            |
| `npm run start`      | Start the compiled app (`dist/index.js`) |
| `npm run migrate:prod` | Apply pending Prisma migrations        |
