FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install
RUN DISABLE_ESLINT_PLUGIN=true yarn build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 7011
CMD ["nginx", "-g", "daemon off;"]