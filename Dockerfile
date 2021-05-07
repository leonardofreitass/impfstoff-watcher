FROM node:14-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencies
RUN npm ci

FROM dependencies AS dev
ENV NODE_ENV development
COPY . .
CMD ["npm", "start"]
