#/bin/bash
mkdir -p /scripts/
cd /scripts/ 
git clone https://github.com/beschulz/wav2json.git
cd /scripts/wav2json/build && make all
mv ../bin/Linux/wav2json /usr/bin/


