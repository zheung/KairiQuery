cd ~/kq
date +"%y-%m-%d %H:%M:%S" >log/bsh.log
fr stop index.js 1>>log/bsh.log 2>log/bsh.log
git pull github master 1>>log/bsh.log 2>>log/bsh.log
fr start -o log/out.log -e log/err.log index.js 1>>log/bsh.log 2>>log/bsh.log