# Use NodeJS base image
FROM node:12-slim

RUN apt-get update || : && apt-get --no-install-recommends install python -y
RUN apt-get --no-install-recommends install g++ -y
RUN apt-get --no-install-recommends install make -y

RUN apt-get clean

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./
COPY www/ ./


# Install dependencies
RUN npm install



# Bind the port that the image will run on
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD ["node", "server.js"]