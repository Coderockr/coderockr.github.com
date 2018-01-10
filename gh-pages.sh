#!/bin/sh
yarn build
cp ./CNAME ./dist/CNAME
cp ./humans.txt ./dist/humans.txt
cp ./crossdomain.xml ./dist/crossdomain.xml
cp ./README.md ./dist/README.md
git add .
git commit -m "Atualizado em $(date +'%F')"
git subtree split --prefix dist -b master # create a local master branch containing the splitted output folder
git push -f origin master:master # force the push of the master branch to the remote master branch at origin
git branch -D master # delete the local master because you will need it: ref
