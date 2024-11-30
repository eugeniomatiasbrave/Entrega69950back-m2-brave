FROM node:20.18.0
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
COPY .env.dev .env
EXPOSE 8080
CMD ["npm", "run", "dev"]
