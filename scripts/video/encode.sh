#!/usr/bin/env bash
# Encodes frames/ into ../../public/media. Override quality: CRF_H264=27 CRF_720=30 CRF_VP9=38 bash encode.sh
set -euo pipefail
cd "$(dirname "$0")"
FF=${FFMPEG:-/opt/homebrew/bin/ffmpeg}; OUT=../../public/media; mkdir -p "$OUT"
IN=(-framerate 24 -i frames/frame-%04d.png)
$FF -y "${IN[@]}" -c:v libx264 -pix_fmt yuv420p -profile:v high -preset slow -crf "${CRF_H264:-27}" -movflags +faststart -r 24 "$OUT/hero.mp4"
$FF -y "${IN[@]}" -vf scale=1280:720:flags=lanczos -c:v libx264 -pix_fmt yuv420p -profile:v high -preset slow -crf "${CRF_720:-30}" -movflags +faststart -r 24 "$OUT/hero-720.mp4"
$FF -y "${IN[@]}" -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf "${CRF_VP9:-38}" -row-mt 1 -r 24 "$OUT/hero.webm"
$FF -y -i frames/frame-0000.png -q:v 4 -update 1 "$OUT/hero-poster.jpg"
ls -l "$OUT"
