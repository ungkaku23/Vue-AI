#!bin/bash
npm install
npm run build
npm uninstall html-pdf
npm install html-pdf
service helloscribe_env restart
service nginx restart