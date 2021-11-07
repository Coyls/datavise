FROM node:17-alpine3.12
USER 0
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000


