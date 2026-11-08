#!/usr/bin/env python3
"""Clip a VRT to a lon/lat rectangle and export as GeoTIFF using gdal_translate."""

from __future__ import annotations

import argparse
import os
import subprocess
import sys


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Use gdal_translate to extract a rectangle (in degrees, EPSG:4326) "
            "from a VRT and save it as GeoTIFF."
        )
    )
    parser.add_argument("--input", required=True, help="Path to input VRT file")
    parser.add_argument("--output", required=True, help="Path to output GeoTIFF file")
    parser.add_argument("--west", type=float, required=True, help="West longitude")
    parser.add_argument("--south", type=float, required=True, help="South latitude")
    parser.add_argument("--east", type=float, required=True, help="East longitude")
    parser.add_argument("--north", type=float, required=True, help="North latitude")
    parser.add_argument(
        "--gdal-translate",
        default="gdal_translate",
        help="gdal_translate executable name or full path",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite output file if it exists",
    )
    return parser.parse_args()


def validate_bbox(west: float, south: float, east: float, north: float) -> None:
    if west >= east:
        raise ValueError("Invalid rectangle: west must be smaller than east")
    if south >= north:
        raise ValueError("Invalid rectangle: south must be smaller than north")
    if west < -180 or east > 180:
        raise ValueError("Longitudes must be within [-180, 180]")
    if south < -90 or north > 90:
        raise ValueError("Latitudes must be within [-90, 90]")


def main() -> int:
    args = parse_args()

    try:
        validate_bbox(args.west, args.south, args.east, args.north)
    except ValueError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 2

    if not os.path.exists(args.input):
        print(f"Error: input file not found: {args.input}", file=sys.stderr)
        return 2

    if args.overwrite and os.path.exists(args.output):
        os.remove(args.output)

    cmd = [
        args.gdal_translate,
        "-of",
        "GTiff",
        "-projwin_srs",
        "EPSG:4326",
        "-projwin",
        str(args.west),
        str(args.north),
        str(args.east),
        str(args.south),
        args.input,
        args.output,
    ]

    print("Running:", " ".join(cmd))
    try:
        subprocess.run(cmd, check=True)
    except FileNotFoundError:
        print(
            f"Error: gdal_translate not found: {args.gdal_translate}",
            file=sys.stderr,
        )
        return 127
    except subprocess.CalledProcessError as exc:
        print(f"Error: gdal_translate failed with exit code {exc.returncode}", file=sys.stderr)
        return exc.returncode

    print(f"Created GeoTIFF: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
