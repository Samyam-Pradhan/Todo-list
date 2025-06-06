FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html


# COPY nginx-certs/nginx-selfsigned.crt /etc/nginx/certs/nginx-selfsigned.crt
# COPY nginx-certs/nginx-selfsigned.key /etc/nginx/certs/nginx-selfsigned.key

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
