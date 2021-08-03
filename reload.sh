#!/bin/bash

git pull

cd werewolf-frontend

npm i
npm run build

cd ../werewolf-backend

npm i
npm run build
npm run stop
npm run pro

