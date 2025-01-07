# Для сборки React приложения
FROM node:latest as build

WORKDIR /app
COPY . .
COPY package*.json ./

RUN npm install
RUN npm run build

FROM nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
