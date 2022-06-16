FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
ENV DB_USER=root
ENV DB_PASSWORD=mysqlpw
ENV DB_NAME=blog_db
ENV DB_HOST=host.docker.internal
ENV DB_PORT=49155
ENV SERVICE_PORT=8000
ENV AUTH_SECRET=mysecret
ENV LIMIT_PER_PAGE=10
EXPOSE 8000
CMD [ "node", "./dist/main.js" ]