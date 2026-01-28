# base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# dev
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

# build
FROM base AS build
RUN npm install --production=false
COPY . .
RUN npm run build

# prod
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]