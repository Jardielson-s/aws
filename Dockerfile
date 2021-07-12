FROM node:12

WORKDIR /src

COPY package.json /src

RUN npm install

COPY . src/

EXPOSE 4000

CMD ["npm", "start"]