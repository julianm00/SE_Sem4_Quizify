# FROM node:10
# # Install python
# RUN apt-get update || : && apt-get install python -y 

# nikolaik der king
FROM nikolaik/python-nodejs:latest


USER root
WORKDIR  usr/src/app


# Install packages 
COPY package*.json ./
RUN npm install





# Copy files over 
COPY . .

# Serve it 
CMD ["npm","start"]


# For puching to the cloud build localy and then use dcoker tag and docker push 
