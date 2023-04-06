FROM osrf/ros:foxy-desktop

ENV DEBIAN_FRONTEND noninteractive

#https://leimao.github.io/blog/Docker-Container-Audio/

# Install package dependencies
# RUN apt-get update -y && \
#     apt-get install -y --no-install-recommends \
#         sudo \
#         alsa-base \
#         alsa-utils \
#         pulseaudio \
#         libportaudio2 \
#         pip \
#         libsndfile1-dev && \
#     apt-get clean


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
COPY /scripts/ros_entrypoint.sh .

COPY /scripts/build_audio_common.sh .
RUN bash build_audio_common.sh

# ENTRYPOINT ["]
# ARG ROS_ENTRY "./ros_entrypoint.sh"

CMD ["bash"]