#Use an existing docker image as a base
FROM node:alpine

WORKDIR /usr/app
#nstall a dependency
COPY ./package.json ./
RUN npm install
COPY ./ ./

#Default command
CMD ["npm","start"]