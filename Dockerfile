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

# Comando para aplicar migraciones y luego iniciar la aplicación
CMD ["sh", "-c", "npx prisma migrate deploy && pnpm run seed && pnpm run start:dev"]
