FROM ubuntu:22.04

# Install package dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        python3-pip \
        alsa-base \
        alsa-utils \
        libsndfile1-dev && \
    apt-get clean

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY serve_sensor_data_app .
