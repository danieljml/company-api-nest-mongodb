# Stage 1: Build the NestJS application
FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
RUN mkdir /app/uploads
VOLUME /app/uploads
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
