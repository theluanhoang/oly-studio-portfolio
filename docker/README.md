# Docker Setup Guide

## Development Environment

### Prerequisites
- Docker and Docker Compose installed
- `.env` file configured (copy from `.env.example`)

### Start Development Environment

```bash
# Using Makefile (recommended - automatically uses sudo)
make dev

# Or manually with docker compose
sudo docker compose up -d

# View logs
sudo docker compose logs -f
# or
make dev-logs

# Stop services
sudo docker compose down
# or
make dev-down

# Stop and remove volumes (WARNING: deletes database data)
sudo docker compose down -v
```

### Access Services
- **Next.js App**: http://localhost:3000
- **PostgreSQL**: localhost:5432
  - User: postgres (from .env)
  - Password: postgres (from .env)
  - Database: oly_portfolio (from .env)

### Run Prisma Commands

```bash
# Using Makefile
make db-generate    # Generate Prisma Client
make db-migrate     # Run migrations
make db-studio      # Open Prisma Studio

# Or manually
sudo docker compose exec app npx prisma generate
sudo docker compose exec app npx prisma migrate dev
sudo docker compose exec app npx prisma studio
```

## Production Environment

### Prerequisites
- `.env.production` file configured (copy from `.env.production.example`)
- SSL certificates (optional, for HTTPS)

### Build and Start Production

```bash
# Using Makefile (recommended)
make prod

# Or manually
sudo docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build

# View logs
sudo docker compose -f docker-compose.prod.yml logs -f
# or
make prod-logs

# Stop services
sudo docker compose -f docker-compose.prod.yml down
# or
make prod-down
```

### Production Features
- Multi-stage Docker build for optimized image size
- Nginx reverse proxy with caching
- Health checks for all services
- Automatic database migrations on startup
- Isolated network (database not exposed externally)

### SSL/HTTPS Setup

1. Place SSL certificates in `docker/nginx/ssl/`:
   - `cert.pem` - SSL certificate
   - `key.pem` - Private key

2. Uncomment HTTPS server block in `docker/nginx/conf.d/default.conf`

3. Update `NEXT_PUBLIC_BASE_URL` in `.env.production` to use HTTPS

## Best Practices Implemented

1. **Multi-stage builds** - Smaller production images
2. **Health checks** - Automatic service recovery
3. **Volume persistence** - Database data survives container restarts
4. **Network isolation** - Services communicate via internal network
5. **Environment variables** - Secure configuration management
6. **Restart policies** - Automatic recovery from failures
7. **Resource limits** - Can be added per service if needed
8. **Logging** - Centralized logging via Docker Compose

## Troubleshooting

### Database connection issues
```bash
# Check database logs
sudo docker compose logs postgres

# Test connection
sudo docker compose exec postgres psql -U postgres -d oly_portfolio
```

### Application build failures
```bash
# Rebuild without cache
sudo docker compose build --no-cache app
```

### Running without sudo

If you want to run docker commands without sudo, set the environment variable:

```bash
USE_SUDO=0 make dev
```

Or add your user to the docker group (recommended for development):
```bash
sudo usermod -aG docker $USER
# Then logout and login again
```

### Port conflicts
Update ports in `.env` file or `docker-compose.yml`

