# Use NodeJS base image
FROM node:12-alpine

RUN apk update 
RUN apk add  python 
RUN apk add  g++
RUN apk add  make 


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./
COPY www/ ./


# Install dependencies
RUN npm install


RUN apk del  python 
RUN apk del  g++
RUN apk del  make 


# Bind the port that the image will run on
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD ["node", "server.js"]