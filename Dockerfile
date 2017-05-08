FROM node:latest
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
RUN mkdir /code
WORKDIR /code
ADD package.json /code/package.json
RUN npm install
ADD . /code
