FROM node:13.10.1
WORKDIR /rpc-rest
ADD . /rpc-rest
RUN yarn install

# Create app directory
# make port available outside of the image
CMD ["node", "rpc-rest.js"]
EXPOSE 3333
