FROM ubuntu:latest
FROM gcc:latest

RUN apt-get update && \
    apt-get install -y curl

WORKDIR /tmp

RUN curl https://sh.rustup.rs -sSf > rustup.sh
RUN chmod 755 rustup.sh
RUN ./rustup.sh -y
RUN rm /tmp/rustup.sh

RUN ~/.cargo/bin/cargo install vtracer
