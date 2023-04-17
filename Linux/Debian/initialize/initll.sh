#! /bin/bash

# 先定义 再调用
backup(){
    if [ ! -e ~/'.bashrc backup' ];then
        D=$(date "+%Y-%m-%d %H:%M:%S")
        cp .bashrc ".bashrc backup $D"
    fi
}

# P=$(ll 2>&1)
# echo $?
# Q=$(ls)
# echo $P
# echo $Q
ll &> /dev/null
if [ $? -ne 0 ];then
    echo "ll: command not found,setting ll command"
    backup

    sed -Ei "s/^#?.*alias.*ll.*=.*'ls -l'$/alias ll='ls -l'/" ".bashrc copy"
    # sed -Ei "s/^#?.*alias.*la.*=.*'ls -A'$/alias la='ls -A'/" ".bashrc copy"
    # sed -Ei "s/^#?.*alias.*l.*=.*'ls -CF'$/alias l='ls -CF'/" ".bashrc copy"
fi

la &> /dev/null
if [ $? -ne 0 ];then
    backup
    echo "la: command not found"
    sed -Ei "s/^#?.*alias.*la.*=.*'ls -A'$/alias la='ls -A'/" ".bashrc copy"
fi

l &> /dev/null
if [ $? -ne 0 ];then
    backup
    echo "l: command not found"
    sed -Ei "s/^#?.*alias.*l.*=.*'ls -CF'$/alias l='ls -CF'/" ".bashrc copy"
fi

