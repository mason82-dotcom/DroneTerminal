FROM debian:12

# Create working directory
WORKDIR /convert-dem-to-stl

# Install Python and gdal dependencies
RUN apt-get update && apt-get install -y python3 python3-pip python3-gdal gdal-bin

# Install phstl
RUN apt-get install -y wget unzip
RUN wget -O phstl.zip https://github.com/OpenFlightHub/phstl/archive/refs/heads/master.zip
RUN unzip phstl.zip -d /convert-dem-to-stl/phstl
RUN rm phstl.zip

# copy scripts to container
COPY clip_vrt_to_geotiff.py ./
COPY make_tif_filepaths.sh ./
COPY make.sh ./

RUN echo build done
