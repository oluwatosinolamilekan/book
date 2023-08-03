# Use the official Node.js LTS image
FROM node:14.17.0

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Nest.js app is running on
EXPOSE 3000

# Start the Nest.js app
CMD [ "npm", "start" ]
