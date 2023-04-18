FROM node:18-alpine3.16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install express --save

COPY . ./
EXPOSE 3000

CMD ["node", "app.js"]
