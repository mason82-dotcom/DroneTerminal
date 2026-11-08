mkdir docker-data

docker stop ofh-cdts || true

docker rm ofh-cdts || true

docker build -t ofh-cdts .

docker run -it --name ofh-cdts -v %cd%/docker-data:/data ofh-cdts

pause