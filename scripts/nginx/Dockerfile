FROM nginx:1.22.1
RUN rm -rf /etc/nginx/nginx.conf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.jenkins.conf /etc/nginx/conf.d
EXPOSE 80/tcp
EXPOSE 443/tcp