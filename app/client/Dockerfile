# Build Stage
FROM node:18-alpine AS build
WORKDIR /app

ARG VITE_BACKEND_API
ENV VITE_BACKEND_API=$VITE_BACKEND_API

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime Stage
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
