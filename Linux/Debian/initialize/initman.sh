#! /bin/env bash

USER=$(whoami)
man --help &> /dev/null
if [ $? -eq 0 ];then
    echo "man command installed"
else
    sudo apt-get install man-db manpages manpages-dev manpages-zh -y
fi