# dalle_generator.py

import os
from pathlib import Path

import openai


def d_generate(promt):
    PROMPT = promt
    # for debugging
    DATA_DIR = Path.cwd() / "responses"
    DATA_DIR.mkdir(exist_ok=True)

    openai.api_key = os.getenv("OPENAI_API_KEY")

    # call dalle to generate images
    response = openai.Image.create(
        prompt=PROMPT,
        n=4,
        size="256x256",
        response_format="b64_json",
    )

    # uncomment for debugging
    # file_name = DATA_DIR / f"{PROMPT[:5]}-{response['created']}.json"

    # with open(file_name, mode="w", encoding="utf-8") as file:
    #     json.dump(response, file)
        
    list_of_images = [response["data"][0]["b64_json"], response["data"][1]["b64_json"],
                      response["data"][2]["b64_json"], response["data"][3]["b64_json"]]
    return list_of_images


if __name__ == '__main__':
    # call the generation function
    print(d_generate("An eco-friendly computer from the 90s in the style of vaporwave"))
