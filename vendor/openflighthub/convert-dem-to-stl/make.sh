#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 5 ]; then
	echo "Usage: ./make.sh <input_folder> <west> <south> <east> <north>"
	exit 1
fi

input_folder="${1%/}"
west="$2"
south="$3"
east="$4"
north="$5"

tmp_folder="${input_folder}-tmp"
mkdir -p "${tmp_folder}"

output_file="${input_folder}.stl"


echo "creating initial vrt ..."
date "+%Y.%m.%d %H:%M:%S"

vrt_file="${tmp_folder}/tiles.vrt"
tiff_path_list="${tmp_folder}/tiles_tifs.txt"

./make_tif_filepaths.sh "${input_folder}" "$tiff_path_list"

gdalbuildvrt -input_file_list "$tiff_path_list" "$vrt_file"


echo "generating clipped geotiff ..."
date "+%Y.%m.%d %H:%M:%S"

clipped_file="${tmp_folder}/clipped.tif"

python3 clip_vrt_to_geotiff.py --input "$vrt_file" --output "$clipped_file" --west "$west" --south "$south" --east "$east" --north "$north" --overwrite

echo "creating stl ..."
date "+%Y.%m.%d %H:%M:%S"

python3 phstl/phstl-master/phstl.py "$clipped_file" "$output_file"

echo "done"
date "+%Y.%m.%d %H:%M:%S"
