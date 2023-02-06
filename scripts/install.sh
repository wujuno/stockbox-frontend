#!/bin/bash
DOCKER_COMPOSE='docker-compose'
SERVICE_NAME='frontend'
source .env

# docker-compose down
if [ $(docker-compose ps -a | grep $COMPOSE_PROJECT_NAME-$SERVICE_NAME | wc -l) -gt 0 ]; then
  $DOCKER_COMPOSE stop $SERVICE_NAME
  $DOCKER_COMPOSE rm -f $SERVICE_NAME
fi

if [ $(docker images | grep $COMPOSE_PROJECT_NAME-$SERVICE_NAME | grep $FRONTEND_VERSION | wc -l) -gt 0 ]; then
  # docker rmi $COMPOSE_PROJECT_NAME-$SERVICE_NAME:$FRONTEND_VERSION $COMPOSE_PROJECT_NAME-nginx:$FRONTEND_VERSION
  docker rmi $COMPOSE_PROJECT_NAME-$SERVICE_NAME:$FRONTEND_VERSION
fi

docker system prune -f

# $DOCKER_COMPOSE up -d
$DOCKER_COMPOSE up -d $SERVICE_NAME