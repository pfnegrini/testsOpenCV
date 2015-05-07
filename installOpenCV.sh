#!/bin/bash

# From http://robertcastle.com/2014/02/installing-opencv-on-a-raspberry-pi/
# To use the camera:  sudo modprobe bcm2835-v4l2 (from https://www.raspberrypi.org/forums/viewtopic.php?t=62364)
sudo apt-get -y install build-essential cmake cmake-curses-gui pkg-config libpng12-0 libpng12-dev libpng++-dev libpng3 libpnglite-dev zlib1g-dbg zlib1g zlib1g-dev pngtools libtiff4-dev libtiff4 libtiffxx0c2 libtiff-tools libeigen3-dev
sudo apt-get -y install libjpeg8 libjpeg8-dev libjpeg8-dbg libjpeg-progs ffmpeg libavcodec-dev libavcodec53 libavformat53 libavformat-dev libgstreamer0.10-0-dbg libgstreamer0.10-0 libgstreamer0.10-dev libxine1-ffmpeg libxine-dev libxine1-bin libunicap2 libunicap2-dev swig libv4l-0 libv4l-dev python-numpy libpython2.6 python-dev python2.6-dev libgtk2.0-dev 

git clone https://github.com/Itseez/opencv.git
cd opencv*
mkdir release
cd release
ccmake ../
make
sudo make install

sudo npm install opencv -g
