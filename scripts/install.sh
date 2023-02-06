#!/bin/bash
DOCKER_COMPOSE='docker-compose'
source .env

if [ $(docker-compose ps -a | grep $COMPOSE_PROJECT_NAME-frontend | wc -l) -gt 0 ]; then
  $DOCKER_COMPOSE stop frontend
  $DOCKER_COMPOSE rm -f frontend
fi
docker system prune -f
docker rmi stockbox-frontend:$FRONTEND_VERSION # stockbox-nginx:$FRONTEND_VERSION
$DOCKER_COMPOSE up -d frontend