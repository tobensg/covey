#!/bin/bash
cd /var/www/covey
docker rm -f covey
docker rmi covey:latest
docker build -t covey .
docker run --name=covey -d -p 3000:3000 covey:latest