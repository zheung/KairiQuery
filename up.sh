eval `ssh-agent`

ssh-add /root/.ssh/kqpu
ssh-add /root/.ssh/kimg

ssh-add -l

cd /root/importer

git clean -fd
git checkout -- .
git pull github master