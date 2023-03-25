# create.py

import json
import os
from pathlib import Path

import openai


def d_generate():
    PROMPT = "An eco-friendly computer from the 90s in the style of vaporwave"
    DATA_DIR = Path.cwd() / "responses"

    DATA_DIR.mkdir(exist_ok=True)


    openai.api_key = os.getenv("OPENAI_API_KEY")
    #openai.api_key = "sk-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"

    response = openai.Image.create(
        prompt=PROMPT,
        n=1,
        size="256x256",
        response_format="b64_json",
    )

    file_name = DATA_DIR / f"{PROMPT[:5]}-{response['created']}.json"

    with open(file_name, mode="w", encoding="utf-8") as file:
        json.dump(response, file)
        
    return response["data"][0]["b64_json"]


if __name__ == '__main__':
    # call create func
    print(create_func())
