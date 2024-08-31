FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

COPY .env .env

RUN yarn build

EXPOSE 3000

CMD ["npm", "run", "dev"]
