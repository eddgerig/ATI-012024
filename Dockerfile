FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y apache2 tzdata && \
    apt-get clean && \
    ln -fs /usr/share/zoneinfo/America/Caracas /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata

COPY . /var/www/html/

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]

