# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose port 3000, which Next.js listens on
EXPOSE 3000

# Define the command to start the Next.js application
CMD ["yarn", "start"]