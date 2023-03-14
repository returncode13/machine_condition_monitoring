FROM osrf/ros:foxy-desktop

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
        pip \
        libsndfile1-dev && \
    apt-get clean

ARG UNAME=dev

# Create user user with sudo privileges
RUN useradd -ms /bin/bash $UNAME && \
    usermod -aG sudo $UNAME
  
# New added for disable sudo password
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN adduser $UNAME  audio



#https://www.stereolabs.com/docs/docker/configure-ros-dockerfile/
ENV ROS2_WS /opt/ros2_ws
RUN mkdir -p $ROS2_WS/src
WORKDIR $ROS2_WS


# build source
RUN colcon \
    build \
    --cmake-args \
      -DSECURITY=ON --no-warn-unused-cli \
    --symlink-install

# setup bashrc
RUN cp /etc/skel/.bashrc ~/

# setup entrypoint
COPY ./ros_entrypoint.sh /



COPY /scripts/build_audio_common.sh .
RUN bash build_audio_common.sh

ENTRYPOINT ["/ros_entrypoint.sh"]

USER $UNAME
CMD ["bash"]