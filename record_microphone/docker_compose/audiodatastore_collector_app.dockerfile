# FROM osrf/ros:foxy-desktop
FROM arm64v8/ros:foxy-ros-base
ENV DEBIAN_FRONTEND noninteractive

#https://leimao.github.io/blog/Docker-Container-Audio/

# Install package dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        sudo \
        alsa-base \
        alsa-utils \
        pulseaudio \
        libportaudio2 \
        ffmpeg \
        pip \
        libsndfile1-dev && \             
    apt-get clean

#https://www.stereolabs.com/docs/docker/configure-ros-dockerfile/
ENV ROS2_WS /opt/ros2_ws
RUN mkdir -p $ROS2_WS/src
WORKDIR $ROS2_WS/src

COPY /scripts/build_audio_common.sh .
RUN bash build_audio_common.sh

RUN pip install pydub

RUN mkdir -p $ROS2_WS/datastore_collector_app/src
WORKDIR $ROS2_WS/datastore_collector_app
# setup entrypoint
COPY ./datastore_collector ./src/datastore_collector
RUN colcon build

