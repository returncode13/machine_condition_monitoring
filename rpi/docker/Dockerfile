FROM arm64v8/ubuntu


COPY requirements.txt .
COPY test.py .
RUN apt-get update && \
apt install -y software-properties-common && apt update && \
add-apt-repository universe && \
apt-get update
RUN  apt install -y build-essential portaudio19-dev python3.10-dev

RUN apt-get install -y python3-pip && \
pip install -r requirements.txt

RUN apt-get install -y alsa-base alsa-utils
ENV DEBIAN_FRONTEND noninteractive

# Install package dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        alsa-base \
        alsa-utils \
        libsndfile1-dev && \
    apt-get clean
#https://stackoverflow.com/questions/41083436/how-to-play-sound-in-a-docker-container-on-mac-os-yosemite