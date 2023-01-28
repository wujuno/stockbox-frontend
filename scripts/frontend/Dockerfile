FROM node:18.13.0-slim
ENV NODE_ENV production
COPY frontend /frontend
WORKDIR /frontend
RUN npm i --save-prod
CMD npm start