FROM node:18.13.0-slim
ENV NODE_ENV production
COPY app /app
WORKDIR /app
RUN npm i -g npm
RUN npm i --save-prod
CMD npm start