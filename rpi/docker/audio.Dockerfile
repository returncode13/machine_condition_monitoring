FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

# Install package dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        alsa-base \
        alsa-utils \
        libsndfile1-dev && \
    apt-get clean

RUN apt-get install -y git build-essential
COPY scripts/record_10_secs.sh .
CMD [ "bash record_10_secs.sh" ]