FROM node:7-onbuild

RUN apt-get update && apt-get install -y \
	rsync \
	libpq-dev \
	git \
	vim \
	redis-tools \
	postgresql-client \
	mysql-client

RUN npm i -g gulp pm2 db-migrate babel-cli

RUN echo 'alias sync="rsync -avzu --exclude=node_modules --exclude=database /src/* /usr/src/app"' >> ~/.bashrc
EXPOSE 3000