FROM node:18-alpine

# Instal Chromium
RUN apk --no-cache add chromium

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon && npm install

RUN npm install @sparticuz/chromium --save

COPY . ./

EXPOSE 5005

# Add a custom npm script to run migrations before starting the application
CMD ["sh", "-c", "npx sequelize db:create --env development || true && npx sequelize db:migrate --env development && nodemon start"]
