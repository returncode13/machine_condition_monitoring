FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

# Install package dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        python3-pip 
        
COPY requirements.txt .
# ARG UNAME=fluser
# ARG UID=1000
# ARG GID=1000
# RUN groupadd -g $GID -o $UNAME
# RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
# USER $UNAME

RUN pip install -r requirements.txt
# USER root
# RUN apt-get install -y npm
RUN apt-get update && apt-get install -y curl --fix-missing
RUN curl -fsSL https://deb.nodesource.com/setup_18.x |  bash - && apt-get install -y nodejs
# RUN apt-get install -y ifconfig ping

WORKDIR /opt
RUN mkdir app
COPY app app/
#listen for changes on 8000
EXPOSE  8000
# WORKDIR /home/${UNAME}/app/js
# CMD [ "node","launch.js" ]
# CMD ["pwd"]
#build using docker build --build-arg UID=$(id -u) --build-arg GID=$(id -g) -t image_name:tag .