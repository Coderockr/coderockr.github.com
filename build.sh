#!/bin/sh
yarn build
cp ./CNAME ./dist/CNAME
cp ./humans.txt ./dist/humans.txt
cp ./crossdomain.xml ./dist/crossdomain.xml
cp ./README.md ./dist/README.md