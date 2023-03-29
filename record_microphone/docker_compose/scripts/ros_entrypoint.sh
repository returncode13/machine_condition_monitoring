#!/bin/bash
set -e
eval "$(register-python-argcomplete3 ros2)"
# setup ros environment

if [ ${ROS_DISTRO} == "foxy" ] ; then
    source "/opt/ros/$ROS_DISTRO/setup.bash"
	source "$ROS2_WS/install/local_setup.bash"
else
	source "/opt/ros/$ROS_DISTRO/setup.bash" 
	source "$ROS_WS/devel/setup.bash"
fi
exec "$@"