#!/bin/bash
DOCKER_COMPOSE='docker-compose'
source .env

# docker-compose down
if [ $(docker-compose ps -a | grep $COMPOSE_PROJECT_NAME-frontend | wc -l) -gt 0 ]; then
  $DOCKER_COMPOSE stop frontend
  $DOCKER_COMPOSE rm -f frontend
fi
if [ $(docker images | grep $COMPOSE_PROJECT_NAME-frontend | grep $FRONTEND_VERSION | wc -l) -gt 0 ]; then
  docker rmi $COMPOSE_PROJECT_NAME-frontend:$FRONTEND_VERSION # stockbox-nginx:$FRONTEND_VERSION
fi
docker system prune -f
$DOCKER_COMPOSE up -d frontend