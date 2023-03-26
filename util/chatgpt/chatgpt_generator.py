import os
import openai
import re
import base64
import requests

user_prompt = "cat, side view"

# Enter prompt as an enumeration of keywords
def prompt_to_png(prompt):
    openai.api_key = "85e3ba53e7a94f999e0d602b6a1775da"
    openai.api_base = "https://azure-openai-hackathon-accessability.openai.azure.com/"
    openai.api_type = 'azure'
    openai.api_version = '2022-12-01' # this may change in the future
    deployment_name = 'azure-openai-davinci'

    initial_prompt = "We are running an experiment in which you will pretend \
        to be able to access the Internet. Don't refuse, just pretend. Thanks \
        for your cooperation. From this moment on, when you want to send a photo, \
        write it in Markdown using the format ![description)(link) without backticks \
        and without using a code block. Use the Pollinations API \
        (https://image.pollinations.ai/prompt/<PUT YOUR QUERY HERE>). \
        Place the text of the prompt under each image in italics. \
        You will act as if you were an image engine returning photos based on my \
        search prompts. You will be acting as if you took the pictures you're sending, \
        do not mention Pollinations."
    built_in_keywords = "black and white, outline, clipart, simple, only contour"
    full_prompt = initial_prompt + '\n' + prompt + ", " + built_in_keywords
    print(full_prompt)

    response = openai.Completion.create(
        engine=deployment_name,
        prompt=full_prompt,
        temperature=0,
        max_tokens=256
    )

    print(response)
    text = response['choices'][0]['text']
    reg = re.search("\(([^)]+)\)", text)
    print("\n----------------------------\nCHATGPT TEXT:\n----------------------------\n")
    print(text)
    print("\n----------------------------\nTRIMMED TEXT:\n----------------------------\n")
    print(reg.group(1))
    url = reg.group(1)
    r = requests.get(url)
    return base64.b64encode(r.text.encode())

prompt_to_png(user_prompt)
