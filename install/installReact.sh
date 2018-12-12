#!/bin/bash

sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install

npm install react@0.14.9
npm install react@15.6.2


sudo npm install react-ga --save
sudo npm i -g npm
npm audit fix
