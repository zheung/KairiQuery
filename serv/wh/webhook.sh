cd ~/kq
fr stop index.js
git pull github master
fr start -o log/out.log -e log/err.log index.js