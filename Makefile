.PHONY: help dev dev-up dev-down dev-logs prod-build prod-up prod-down prod-logs db-migrate db-studio clean

# Docker Compose command (use 'docker compose' v2 or 'docker-compose' v1)
# Set USE_SUDO=1 to use sudo, or USE_SUDO=0 to run without sudo
USE_SUDO ?= 1

# Try docker compose v2 first, fallback to docker-compose v1
DOCKER_COMPOSE_V2 = $(if $(filter 1,$(USE_SUDO)),sudo docker compose,docker compose)
DOCKER_COMPOSE_V1 = $(if $(filter 1,$(USE_SUDO)),sudo docker-compose,docker-compose)

# Check which version is available (default to v2)
DOCKER_COMPOSE = $(DOCKER_COMPOSE_V2)

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ''
	@echo 'Environment variables:'
	@echo '  USE_SUDO=1    Use sudo for docker commands (default: 1)'
	@echo '  USE_SUDO=0    Run docker commands without sudo'

# Development commands
dev-up: ## Start development environment
	$(DOCKER_COMPOSE) up -d

dev-down: ## Stop development environment
	$(DOCKER_COMPOSE) down

dev-logs: ## View development logs
	$(DOCKER_COMPOSE) logs -f

dev: dev-up dev-logs ## Start dev and follow logs

# Production commands
prod-build: ## Build production images
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml build

prod-up: ## Start production environment
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml up -d

prod-down: ## Stop production environment
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml down

prod-logs: ## View production logs
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml logs -f

prod: prod-build prod-up ## Build and start production

# Database commands
db-migrate: ## Run database migrations
	$(DOCKER_COMPOSE) exec app npx prisma migrate deploy

db-studio: ## Open Prisma Studio
	$(DOCKER_COMPOSE) exec app npx prisma studio

db-generate: ## Generate Prisma Client
	$(DOCKER_COMPOSE) exec app npx prisma generate

# Utility commands
clean: ## Remove all containers, volumes, and images
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml down -v
	$(if $(filter 1,$(USE_SUDO)),sudo docker system prune -af,docker system prune -af)

restart-dev: dev-down dev-up ## Restart development environment

restart-prod: prod-down prod-up ## Restart production environment

