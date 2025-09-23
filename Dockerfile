FROM node:23-alpine

WORKDIR /app

COPY ../../pnpm-lock.yaml ../../package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
