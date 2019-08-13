FROM node
COPY package*.json ./
RUN npm install
COPY ./app /app
COPY ./blockchain /blockchain
CMD ["node", "./app/index.js"]
