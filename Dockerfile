FROM node:18.15-alpine3.17 as base

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# COPY package*.json ./
RUN npm install --silent
COPY . .

FROM base as dev
ENV NODE_ENV=development
RUN npm cache clean --force
RUN npm install -g --unsafe-perm=true --allow-root @ionic/cli@6.20.4
RUN npm config set cache /app/logs --global
# RUN npm audit fix
USER root
CMD ["npm", "start"]

# FROM base as pre-prod
# COPY . .
# USER root
# RUN npm run build
# RUN rm -rf ./node_modules && rm -rf ./src

# FROM nginx:1.19.0-alpine as prod
# COPY --from=pre-prod /app/build/ /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]