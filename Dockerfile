FROM node:7.6

RUN apt-get update && apt-get install -y \
	rsync \
	libpq-dev \
	git \
	vim \
  lsof \
	redis-tools \
	postgresql-client \
	mysql-client

RUN npm i -g gulp pm2 babel-cli webpack-dev-server
COPY ./package.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install

COPY . /usr/src/app/
RUN echo 'alias sync="rsync -avzu --exclude=node_modules --exclude=database /src/* /usr/src/app"' >> ~/.bashrc
RUN echo 'alias mysqlsh="mysql -h $MYSQL_HOST -p $MYSQL_PORT -u $MYSQL_USER --password=$MYSQL_PASSWORD $MYSQL_DATABASE"' >> ~/.bashrc
RUN echo 'alias redissh="redis-cli -h $REDIS_HOST -p $REDIS_PORT"' >> ~/.bashrc
EXPOSE 3000

CMD sync && npm start
