FROM ubuntu:22.04


ARG UNAME=dev
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
USER $UNAME
ENV DEBIAN_FRONTEND noninteractive
WORKDIR /home/${UNAME}
USER root
# Install package dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        python3-pip \
        alsa-base \
        alsa-utils \
        libsndfile1-dev && \
    apt-get clean

COPY requirements.txt .

RUN pip install -r requirements.txt

USER $UNAME

COPY app .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
#build using docker build --build-arg UID=$(id -u) --build-arg GID=$(id -g) -t image_name:tag .
