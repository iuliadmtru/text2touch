import base64
import subprocess

import openai

from text2touch import settings


class DALLE2Service:
    @staticmethod
    def generate(prompt):
        # set OpenAI API key
        openai.api_key = settings.OPENAI['API_KEY']

        # call DALL·E 2 to generate images
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="256x256",
            response_format="b64_json",
        )

        # uncomment for debugging
        # DATA_DIR = Path.cwd() / "responses"
        # DATA_DIR.mkdir(exist_ok=True)
        # file_name = DATA_DIR / f"{PROMPT[:5]}-{response['created']}.json"
        # with open(file_name, mode="w", encoding="utf-8") as file:
        #     json.dump(response, file)

        return [DALLE2Service.png2svg(data["b64_json"]) for data in response["data"]]

    @staticmethod
    def png2svg(png):
        bs = base64.b64decode(png.encode())
        with open('./tmp/input.png', 'wb') as f:
            f.write(bs)

        cmd = ['./bin/vtracer-linux', '-i', './tmp/input.png', '-o', './tmp/output.svg']
        process = subprocess.Popen(cmd)
        process.wait()

        with open('./tmp/output.svg', 'rb') as f:
            return base64.b64encode(f.read()).decode()
