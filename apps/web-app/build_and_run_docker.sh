docker build -t ofh-web-app .

docker stop ofh-web-app || true

docker rm ofh-web-app || true


docker run --restart unless-stopped --name ofh-web-app -p 8080:80 -d ofh-web-app