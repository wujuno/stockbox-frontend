FROM node:16.19.1-bullseye

ENV NODE_ENV 'development'
ENV LANG 'ko_KR.utf8'
ENV TZ 'Asia/Seoul'

RUN apt-get update
RUN apt-get install git vim nano zsh curl wget nmap net-tools iputils-ping locales-all gcc g++ make -y
RUN npm i -g npm typescript
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN chsh root -s /usr/bin/zsh
RUN mkdir -p /stockbox
WORKDIR /stockbox
COPY . /stockbox/frontend
WORKDIR /stockbox/frontend