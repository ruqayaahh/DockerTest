#Dockerfile holds instructions that clearly documents our deployment process

# Set/choose base image to use
FROM --platform=linux/amd64 node:alpine
# Create app/server nested directory
RUN mkdir -p /app/server
# Make working directory be app/server
WORKDIR /app/server
# Add all files in root directory to app/server
ADD . /app/server
# Force delete the node_modules copied over to app/server
RUN rm -rf node_modules
# Run npm install to have new node_modules and instal dependencies
RUN npm install
CMD ["npm", "run", "dev"]