#!/bin/bash
DOCKER_COMPOSE='docker-compose'
source .env

$DOCKER_COMPOSE down
docker system prune -f
docker rmi stockbox-frontend:$FRONTEND_VERSION nginx:$FRONTEND_VERSION
$DOCKER_COMPOSE up -d