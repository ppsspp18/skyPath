# backend/Dockerfile

# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port defined in index.js (4000)
EXPOSE 4000

# Start the application
# Note: Based on your file structure, the entry file is in src/index.js
CMD ["node", "src/index.js"]