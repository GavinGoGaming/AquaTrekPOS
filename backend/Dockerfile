# Use an official Node.js runtime as a parent image (LTS version is recommended)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package*.json files to the working directory to leverage Docker cache
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port the app runs on (change if your app uses a different port)
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "start"]
