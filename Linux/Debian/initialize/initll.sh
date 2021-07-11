#! /bin/env bash

ll &> /dev/null
if [ $? -ne 0 ];then
    # sed '/^#/' .bashrc
    sed -r 's/^#?.*alias.*ll=/' .bashrc
fi
