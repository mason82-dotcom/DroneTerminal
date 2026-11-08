FROM node:24 as build-web-app


# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .
RUN npm run build

# fix cesium static
RUN mkdir -p dist/cesiumStatic

RUN cp -r node_modules/@cesium/engine/Build/ThirdParty dist/cesiumStatic/ThirdParty
RUN cp -r node_modules/@cesium/engine/Build/Workers dist/cesiumStatic/Workers
RUN cp -r node_modules/@cesium/engine/Source/Assets dist/cesiumStatic/Assets
RUN cp -r node_modules/@cesium/widgets/Source dist/cesiumStatic/Widgets


FROM nginx:alpine
RUN apk add --update openssl

# alpine does not include www-data user
RUN addgroup -g 1000 -S www-data; exit 0
RUN adduser -u 1000 -D -S -G www-data www-data; exit 0

RUN rm -f /etc/nginx/nginx.conf
COPY --from=build-web-app /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-web-app /app/dist /usr/share/nginx/html

# calculate sh256 hash for index.js, base64 encode it and insert it into the nginx config
RUN cat "$(find /usr/share/nginx/html -name 'index-*.js')" | openssl dgst -sha256 -binary > hash.txt

RUN cat hash.txt | openssl base64 -A > hash_base64.txt

RUN echo "sha256-$(cat hash_base64.txt)" > hash_base64_digest.txt

# replace CSP_MAIN_TS_HASH in index.html
RUN awk 'BEGIN{getline l < "hash_base64_digest.txt"}/CSP_MAIN_TS_HASH/{gsub("CSP_MAIN_TS_HASH",l)}1' /usr/share/nginx/html/index.html > output.txt
RUN mv output.txt /usr/share/nginx/html/index.html

# replace CSP_MAIN_TS_HASH in nginx.conf
RUN awk 'BEGIN{getline l < "hash_base64_digest.txt"}/CSP_MAIN_TS_HASH/{gsub("CSP_MAIN_TS_HASH",l)}1' /etc/nginx/nginx.conf > output.txt
RUN mv output.txt /etc/nginx/nginx.conf




EXPOSE 80
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]