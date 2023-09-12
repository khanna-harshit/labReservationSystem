FROM node:14-alpine AS client_build
WORKDIR /app
COPY ./frontend /app/
RUN npm install
RUN npm install -g @angular/cli
RUN node_modules/.bin/ng build --configuration production

# build back end
FROM node:14-alpine AS server_build
WORKDIR /app 
COPY ./backend /app/
COPY --from=client_build /app/dist/frontend /app/dist/frontend
RUN npm install --production

# build docker
FROM alpine
WORKDIR /app
RUN apk add --no-cache nodejs
COPY --from=server_build /app ./
COPY . .
EXPOSE 3006
CMD ["node" , "backend"]

