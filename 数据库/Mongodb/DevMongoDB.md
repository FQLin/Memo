``` dockerfile
# dev_mongodb_dockerfile
FROM centos
ADD ./mongodb-linux-x86_64-rhel80-4.4.1.tgz /usr/local/
RUN mv mongodb-linux-x86_64-rhel80-4.4.1 mongodb
RUN mkdir -p /usr/local/mongodb/data /usr/local/mongodb/logs
# /usr/local/mongodb/bin/mongod --dbpath=/usr/local/mongodb/data --logpath=/usr/local/mongodb/logs/mongodb.log --logappend --port=27017 --fork
EXPOSE 27017
CMD ["/usr/local/mongodb/bin/mongod","--dbpath=/usr/local/mongodb/data","--logpath=/usr/local/mongodb/logs/mongodb.log","--logappend","--port=27017","--fork"]
```

