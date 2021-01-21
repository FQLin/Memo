# docker build -f .\mongos.dockerfile -t mongos:latest .
# docker run --name mongos -d mongos:latest
# docker exec -it mongos /bin/bash

FROM ubuntu:latest
ADD mongodb-linux-x86_64-ubuntu2004-4.4.3.tgz /opt/
WORKDIR /opt/mongodb-linux-x86_64-ubuntu2004-4.4.3
RUN mv bin/* /usr/local/bin
RUN mkdir -p /var/lib/mongo /var/log/mongodb
COPY sources.list /etc/apt/
WORKDIR /
RUN apt update
RUN apt upgrade -y
RUN apt-get install -y libcurl4 openssl liblzma5

EXPOSE 27017
CMD ["mongos"]