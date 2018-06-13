# LXD Setup Guide - Building the Container

<<<<<<< HEAD
### LXD Setup on Dawn v4.1

```console
cd /opt/eos
git pull
git checkout dawn-v4.2.0
git submodule update --recursive
```

### Change token name
=======
### LXD Setup on Dawn 2018-05-30
```console
cd /opt/eos
git pull
git checkout DAWN-2018-05-30
git submodule update --recursive
```

### Change token name - CORE_SYMBOL_NAME
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24

```console
ex -sc '16i|set( CORE_SYMBOL_NAME "EOS" )' -cx CMakeLists.txt
./eosio_build.sh

build/programs/nodeos/nodeos --version
<<<<<<< HEAD
# should output 3449264167
=======
# should output 3655280044
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
```

### initialize LXD
```conole
sudo lxd init
```

### launch a ubuntu 18.04 container
```console
lxc launch ubuntu:18.04 eos-node
```

### enter bash
```console
lxc exec eos-node -- /bin/bash
apt update
apt upgrade
```

### create a user for eos
```console
sudo adduser eos
# complete interactive instructions

sudo usermod -aG sudo eos

mkdir -p /opt/eos
chown eos:eos /opt/eos
```

### exit the lxd container
```console
exit
```

### copy nodeos binary
```console
lxc file push /opt/eos/build/programs/nodeos/nodeos  eos-node/opt/eos/nodeos
lxc file push /opt/eos/build/programs/cleos/cleos  eos-node/opt/eos/cleos
<<<<<<< HEAD
```
=======
lxc file push /opt/eos/build/programs/keosd/keosd  eos-node/opt/eos/keosd
```

>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
### test execution on container
```console
lxc exec eos-node -- /opt/eos/nodeos --version
```
