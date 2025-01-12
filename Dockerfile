# Step 1: Use an official Node.js 20.15.1 image as the base image
FROM node:20.15.1 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the app’s source code to the container
COPY . ./

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a lightweight server to serve the build (e.g., Nginx)
FROM nginx:alpine


# Step 8: Copy the build output from the previous step to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Step 9: Expose the container's port (default for Nginx is 80)
EXPOSE 80

# Step 10: Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
