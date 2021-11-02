FROM node:17-alpine3.12
WORKDIR /app
COPY . /app
RUN npm install --quiet
EXPOSE 3000


