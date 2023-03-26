import os
import openai
import re
import base64
import requests

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

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

# user_prompt = "dog, side view, black and white, outline, clipart, simple"

# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
def prompt_to_code(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": initial_prompt},
            {"role": "user", "content": prompt}
        ]
    )

    text = response['choices'][0]['message']['content']
    reg = re.search("\(([^)]+)\)", text)
    print("\n----------------------------\nCHATGPT TEXT:\n----------------------------\n")
    print(text)
    print("\n----------------------------\nTRIMMED TEXT:\n----------------------------\n")
    print(reg.group(1))
    url = reg.group(1)
    f = requests.get(url)
    return base64.b64encode(f.text.encode())
