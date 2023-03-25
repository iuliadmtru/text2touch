import subprocess
import sys
import base64

def decode_base_64_image(image_in_base64):
    tmp = image_in_base64.encode()
    image_in_bytes = base64.b64decode(tmp)

    with open('input.png', 'wb') as fw:
        fw.write(image_in_bytes)


def encode_image_in_base64():
    with open('output.svg', 'rb') as svg_image:
        encoded_image_in_base64 = base64.b64encode(svg_image.read())

        return encoded_image_in_base64


def main():
    input = decode_base_64_image('Image in base64 from Ana here')
    cmd = ['vtracer', '-i', 'input.png', '-o', 'output.svg']
    process = subprocess.Popen(cmd)
    process.wait()

    encode_image_in_base64()


if __name__ == "__main__":
    sys.exit(main())
