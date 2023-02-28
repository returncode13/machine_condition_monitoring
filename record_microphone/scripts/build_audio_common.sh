#!/bin/bash
set -e

#
cd $ROS2_WS/src 
git clone https://github.com/ros-drivers/audio_common.git -b ros2
rosdep update && rosdep install --from-paths . --ignore-src -y --rosdistro=foxy
source /opt/ros/foxy/setup.bash
cd $ROS2_WS/src/audio_common && colcon build 
source install/local_setup.bash
