#!/bin/bash
set -e

exedir="$(dirname "$0")"

image="duke-test-client:latest"
repoHost="docker.10duke.com:443"

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

tag1="10duke/duke-test-client:${packageVersion}.test1"
docker tag "${latestImageId}" "${repoHost}/${tag1}"
echo "Added tag ${tag1}"
#tag2="10duke/duke-test-client:latest"
#docker tag "${latestImageId}" "${repoHost}/${tag2}"
#echo "Added tag ${tag2}"

docker push "${repoHost}/${tag1}"
echo "Pushed ${repoHost}/${tag1}"
#docker push "${repoHost}/${tag2}"
#echo "Pushed ${repoHost}/${tag2}"
