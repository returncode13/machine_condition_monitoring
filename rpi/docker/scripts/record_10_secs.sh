#!/bin/bash
arecord -f S16_LE -c 1  -r 48000 -t wav --max-file-time 10 --device="hw:1,0" /tmp/rec.wav