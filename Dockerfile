FROM arm32v7/nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY ReadableDateTime.js /usr/share/nginx/html/src/ReadableDateTime.js
COPY clock.js /usr/share/nginx/html/src/clock.js