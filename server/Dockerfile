FROM node:22.13.1-alpine
WORKDIR /app
COPY . .

RUN addgroup -S app && adduser -S -G app app \
    && chown -R app:app /app
RUN npm install

USER app

ENV API_KEY=https://my-api.com/api-key

EXPOSE 3000 

CMD ["npm", "start"]