FROM alpine AS certs
RUN apk update && apk add openssl
COPY selfsigned-cert.conf .
RUN mkdir certs && openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
    -keyout certs/localhost.key -out certs/localhost.crt -config selfsigned-cert.conf

FROM node:13-alpine AS build
COPY package.json package-lock.json ./
RUN npm install
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:alpine
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=certs certs /usr/share/nginx/certs
COPY --from=build build /usr/share/nginx/html
COPY package.json /usr/share/nginx/html/
EXPOSE 80 443
