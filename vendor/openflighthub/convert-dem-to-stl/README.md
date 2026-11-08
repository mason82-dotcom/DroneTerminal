# Bootup docker container

on Windows: run `build_and_run_docker.cmd`

on Linux: run `build_and_run_docker.sh`

## Generate stl from geotiff

```
python3 phstl/phstl-master/phstl.py --solid /data/584_5267.tif /data/output.stl
```

## Generate stl from folder of tifs, specifing specific coordinates

```
./make.sh /data/folder-with-tifs 10.1879157 47.5226017 10.1933571 47.5292561 100
```

*Explanation:*
```
./make.sh /data/folder-with-tifs <west> <south> <east> <north> <height of fundament>
```

output will be /data/folder-with-tifs.stl

# Development Infos

To force Docker to rebuild, add --no-cache to the `docker build` command
