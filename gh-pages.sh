#!/bin/sh
if [ -z "$1" ]
then
  echo "Which folder do you want to deploy to GitHub Pages?"
  exit 1
fi
cp ./CNAME ./dist/CNAME
cp ./humans.txt ./dist/humans.txt
cp ./crossdomain.xml ./dist/crossdomain.xml
cp ./README.md ./dist/README.md
git subtree push --prefix $1 origin master