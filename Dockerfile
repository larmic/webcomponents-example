FROM arm32v7/nginx:alpine

COPY src/index.html /usr/share/nginx/html/index.html
COPY src/ReadableDateTime.js /usr/share/nginx/html/ReadableDateTime.js
COPY src/clock.js /usr/share/nginx/html/clock.js