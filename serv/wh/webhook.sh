#!/bin/bash
cd ~/kq
forever stop index.js
git pull github master
forever start -o log/out.log -e log/err.log index.js