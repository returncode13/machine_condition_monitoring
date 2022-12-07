FROM ubuntu:22.04

#https://stackoverflow.com/questions/44683119/dockerfile-replicate-the-host-user-uid-and-gid-to-the-image
ARG UNAME=dev
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
USER $UNAME
ENV DEBIAN_FRONTEND noninteractive
WORKDIR /home/$UNAME


USER root

RUN apt-get update && apt-get install -y libsndfile1-dev ffmpeg python3-pip #https://github.com/readthedocs/readthedocs.org/issues/6086#issuecomment-579671762

USER $UNAME
#https://github.com/librosa/librosa/issues/1156
RUN mkdir -m 777 /tmp/NUMBA_CACHE_DIR /tmp/MPLCONFIGDIR
ENV NUMBA_CACHE_DIR=/tmp/NUMBA_CACHE_DIR/
ENV MPLCONFIGDIR=/tmp/MPLCONFIGDIR/


ENV PATH="/home/$UNAME/.local/bin:${PATH}"


COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./app /home/$UNAME/app

#listen for changes on 8000
EXPOSE  8000
#build using docker build --build-arg UID=$(id -u) --build-arg GID=$(id -g) -t image_name:tag .
