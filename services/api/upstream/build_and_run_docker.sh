# replace localhost with host.docker.internal in secrets.json

sed -i 's/localhost/host.docker.internal/g' secrets.json

docker build -t ofh-api .

sed -i 's/host.docker.internal/localhost/g' secrets.json

docker stop ofh-api || true

docker rm ofh-api || true

docker run --restart unless-stopped --add-host host.docker.internal:host-gateway --add-host internal-ofh-api:host-gateway -p 6001:6001 --name ofh-api -d ofh-api