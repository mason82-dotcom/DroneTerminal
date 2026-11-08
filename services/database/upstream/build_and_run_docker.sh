docker pull postgres:15.2

docker stop ofh-database || true

docker rm ofh-database || true

docker volume rm ofh-pg-data

docker run -itd --restart unless-stopped -e POSTGRES_USER=ofh -e POSTGRES_PASSWORD=ofh -p 5000:5432 -v ofh-pg-data:/var/lib/postgresql  --name ofh-database postgis/postgis:18-3.6

cat wait-for.sh | sh -s -- localhost:5000 -- echo "Database is up"
sleep 10


rm -r ~/Documents/ofh_files/*
cp -r example_files/* ~/Documents/ofh_files/

cat 0_init_database.sql | docker exec -i ofh-database psql -v ON_ERROR_STOP=1 --dbname=postgresql://ofh:ofh@localhost:5432
cat 1_init_tables.sql | docker exec -i ofh-database psql -v ON_ERROR_STOP=1 --dbname=postgresql://ofh:ofh@localhost:5432
cat 2_init_users_and_permissions.sql | docker exec -i ofh-database psql -v ON_ERROR_STOP=1 --dbname=postgresql://ofh:ofh@localhost:5432
cat 3_setup_triggers.sql | docker exec -i ofh-database psql -v ON_ERROR_STOP=1 --dbname=postgresql://ofh:ofh@localhost:5432

cat X_fill_with_example_data.sql | docker exec -i ofh-database psql -v ON_ERROR_STOP=1 --dbname=postgresql://ofh:ofh@localhost:5432

echo ""

read -n 1 -s -r -p "Press any key to continue"
