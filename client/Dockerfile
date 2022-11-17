#Dockerfile holds instructions that clearly documents our deployment process

# Set/choose base image to use
# alpine is chosen because it is a very small image (a popular linux distro too)
# added the --platform tag so it also runs on host with linux/amd64 platform (runs arm64/v8 by default)
FROM --platform=linux/amd64 node:alpine 
# Create app/client nested directory
RUN mkdir -p /app/client
# Make working directory be app/client
WORKDIR /app/client
# Add all files in root directory to app/client
ADD . /app/client
# Force delete the node_modules copied over to app/client
RUN rm -rf node_modules
# Run npm install to have new node_modules and install dependencies
RUN npm install
CMD ["npm", "run", "dev"]