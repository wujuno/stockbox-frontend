FROM node:16.19.1-bullseye

ENV CHSH yes
ENV RUNZSH no
ENV NODE_ENV development
ENV TZ Asia/Seoul

RUN apt-get update
RUN apt-get install git vim nano zsh curl wget nmap net-tools iputils-ping -y
RUN npm i -g npm
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN chsh root -s /usr/bin/zsh
RUN mkdir -p /stockbox
WORKDIR /stockbox
RUN git config --global user.email "stockbox.kro.kr"
RUN git config --global user.name "stockbox"
RUN git clone https://gitlab.com/stockbox/front-end.git frontend
WORKDIR /stockbox/frontend