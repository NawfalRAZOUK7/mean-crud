# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make the app available on port 3000
EXPOSE 3000

# Define environment variable
ENV MONGODB_URL=mongodb+srv://nawfalrazouk:OGB8XMjRhm0K4ygh@cluster0.hvdzqzo.mongodb.net/todoApp?retryWrites=true&w=majority
ENV JWT_SECRET="mysecretkey"

# Command to run the application
CMD ["node", "app.js"]


