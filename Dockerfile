FROM node:20-alpine AS builder

WORKDIR /app

COPY  package*.json ./

COPY tsconfig.json .

RUN npm install --production

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder  /app/dist ./dist

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5000

CMD ["npm","run","start"]

