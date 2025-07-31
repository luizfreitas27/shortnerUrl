FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 8080

# Rodar migrações e depois iniciar app no modo dev
CMD ["sh", "-c", "pnpm migrate && pnpm dev"]
