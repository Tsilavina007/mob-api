# mob-api

A RESTful API built with TypeScript, Express.js, Prisma (PostgreSQL), JWT authentication, and Swagger UI documentation.

## Tech Stack

- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma (PostgreSQL)
- **Auth**: bcryptjs + JWT
- **Docs**: swagger-ui-express (OpenAPI)
- **Port**: 3000

## Environment Variables

Create a `.env` file at the project root based on `.env.template`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mobapi
JWT_SECRET=your_jwt_secret
PORT=3000
```

| Variable       | Description                          | Required |
| -------------- | ------------------------------------ | -------- |
| `DATABASE_URL` | PostgreSQL connection string         | Yes      |
| `JWT_SECRET`   | Secret key for JWT signing           | Yes      |
| `PORT`         | HTTP port (default: 3000)            | No       |

## Installation locale

1. Clone the repository:
   ```bash
   git clone https://github.com/Tsilavina007/mob-api.git
   cd mob-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see above).

4. Apply database migrations:
   ```bash
   npm run migrate:dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API is available at `http://localhost:3000`.

## Docker local

### Using `docker run`

1. Build the image:
   ```bash
   docker build -t mob-api .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL=postgresql://user:password@host:5432/mobapi \
     -e JWT_SECRET=your_jwt_secret \
     mob-api
   ```

### Using `docker-compose`

Create a `docker-compose.yml`:

```yaml
version: "3.8"
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/mobapi
      JWT_SECRET: your_jwt_secret
      NODE_ENV: production
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mobapi
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Then run:
```bash
docker-compose up --build
```

## Render Deployment with Docker

This project includes a `render.yaml` for one-click deployment on [Render](https://render.com).

### Steps

1. Push the repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
3. Connect your GitHub repository — Render will detect `render.yaml` automatically.
4. Set the `JWT_SECRET` environment variable in the Render dashboard (marked `sync: false` in `render.yaml`).
5. Click **Apply** — Render will:
   - Provision a free PostgreSQL database (`mob-api-db`)
   - Build the Docker image
   - Deploy the API service

The `DATABASE_URL` is automatically injected from the provisioned database.

### Manual deployment

If you prefer to deploy manually without the Blueprint:

1. Create a **Web Service** on Render with:
   - **Runtime**: Docker
   - **Dockerfile**: `./Dockerfile`
2. Add the required environment variables listed above.
3. Create a **PostgreSQL** database on Render and link its connection string to `DATABASE_URL`.

## API Documentation (Swagger)

Once the server is running, the interactive API documentation is available at:

```
http://localhost:3000/api-docs
```

## Project Structure

```
mob-api/
├── src/                  # TypeScript source code
│   ├── configs/          # App configuration
│   ├── controllers/      # Route controllers
│   ├── errors/           # Custom error classes
│   ├── index.ts          # Entry point
│   ├── mappers/          # Data mappers (DB ↔ REST)
│   ├── middlewares/      # Express middlewares (auth, errors)
│   ├── routes/           # Express routers
│   ├── server.ts         # Express app setup
│   ├── services/         # Business logic
│   ├── types/            # TypeScript types
│   ├── utilities/        # Helper utilities
│   └── validator/        # Request validation (Zod)
├── clients/              # Auto-generated OpenAPI TypeScript client
├── docs/                 # OpenAPI specification (api.yml, openapi.json)
├── prisma/
│   ├── schema.prisma     # Prisma schema (PostgreSQL)
│   └── migrations/       # Database migrations
├── Dockerfile            # Multi-stage Docker build
├── .dockerignore
├── render.yaml           # Render deployment configuration
└── package.json
```

## Scripts

| Script              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start development server with hot reload         |
| `npm run build`     | Compile TypeScript to `dist/`                    |
| `npm start`         | Apply schema & start production server           |
| `npm run migrate:dev` | Create and apply a new Prisma migration        |
| `npm run gen:client` | Regenerate OpenAPI TypeScript client            |
| `npm run studio`    | Open Prisma Studio (database GUI)               |
| `npm run format`    | Format code with Prettier                        |

