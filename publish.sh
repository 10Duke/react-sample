#!/bin/bash

#
# This script publishes local duke-test-client:latest image to 10Duke internal
# Docker registry (docker-private.10duke.com:8443).
#
# Version is tagged and published with both "latest" and actual version number tags.
# Version number is read from package.json from the local duke-test-client:latest image.
# For example, if version number from package.json is 1.2.3, the following images are
# pushed to docker-private.10duke.com:8443:
#
# 10duke/duke-test-client:1.2.3
# 10duke/duke-test-client:latest
#
# docker login against docker-private.10duke.com:8443 is required before running this script.
#

set -e

exedir="$(dirname "$0")"

image="duke-test-client:latest"
repoHost="docker-private.10duke.com:8443"

latestImageId=`docker images -q ${image}`
echo "Publishing ${image} (image id ${latestImageId})"

echo "Getting version from package.json in the container..."
packageJson=`docker run --rm ${latestImageId} cat /usr/share/nginx/html/package.json`
regex='"version": "([^"]+)"'
if [[ $packageJson =~ $regex ]]
then
  packageVersion="${BASH_REMATCH[1]}"
fi
echo "Package version: ${packageVersion}"

tag1="10duke/duke-test-client:${packageVersion}"
docker tag "${latestImageId}" "${repoHost}/${tag1}"
echo "Added tag ${tag1}"
tag2="10duke/duke-test-client:latest"
docker tag "${latestImageId}" "${repoHost}/${tag2}"
echo "Added tag ${tag2}"

docker push "${repoHost}/${tag1}"
echo "Pushed ${repoHost}/${tag1}"
docker push "${repoHost}/${tag2}"
echo "Pushed ${repoHost}/${tag2}"
