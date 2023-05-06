
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies 
# This is needed to build and compile our code 
# while generating the docker image
FROM node:16.13-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /usr/src/app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# If you are building your code for production
COPY . .
RUN npm install
CMD [ "node", "app.js" ]

EXPOSE 3005



