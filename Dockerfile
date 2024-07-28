FROM node:18

WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
