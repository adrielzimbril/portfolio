FROM node:23-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
