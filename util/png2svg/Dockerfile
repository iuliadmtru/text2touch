FROM ubuntu:latest
FROM gcc:latest

RUN apt-get update && \
    apt-get install -y curl

WORKDIR /tmp

# Install rustup and cargo
RUN curl https://sh.rustup.rs -sSf > rustup.sh
RUN chmod 755 rustup.sh
RUN ./rustup.sh -y
RUN rm /tmp/rustup.sh

# Install vtracer
RUN ~/.cargo/bin/cargo install vtracer

# Install python3 and pip
RUN apt install python3 -y
RUN apt install python3-pip -y

# Run the png2svg script
COPY my-png2svg.py /tmp
CMD ["python3", "/tmp/my-png2svg.py"]
