# Use official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (using clean install for reliable builds)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the Node.js server
CMD ["node", "server.js"]
