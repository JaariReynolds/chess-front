# Use Node.js version 16
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# The command to run the app (adjust as necessary)
CMD ["npm", "start"]

# Expose the port your app runs on (change this if your app runs on a different port)
EXPOSE 5180
