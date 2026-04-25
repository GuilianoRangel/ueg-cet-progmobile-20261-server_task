# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Instala as dependências necessárias para o build (incluindo devDependencies)
COPY package*.json ./
RUN npm install

# Copia o código fonte e os arquivos de configuração
COPY . .

# Executa o build da aplicação
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner

WORKDIR /app

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Copia os arquivos necessários do estágio de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instala apenas as dependências de produção
RUN npm install --only=production

# Expõe a porta que a aplicação utiliza
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
