FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

# Install package dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        alsa-base \
        alsa-utils \
        libsndfile1-dev && \
    apt-get clean

RUN apt-get install -y git build-essential make g++ libsndfile1-dev libboost-program-options-dev

WORKDIR /scripts
COPY scripts/wav2json_install.sh .
RUN bash /scripts/wav2json_install.sh
#ENTRYPOINT [ "wav2json " ]