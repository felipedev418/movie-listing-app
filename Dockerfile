FROM node:20.15.1

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --force

EXPOSE 5000
CMD ["npm", "run", "dev"]
