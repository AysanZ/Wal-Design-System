# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Storybook
RUN npm run build-storybook

# Use a lightweight web server to serve the Storybook
FROM nginx:alpine

# Copy the Storybook build to the Nginx HTML directory
COPY --from=0 /app/storybook-static /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
