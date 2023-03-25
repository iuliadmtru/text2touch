import os
import openai
import re
import base64

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

prompt1 = "Generate a piece of SVG code that creates the image of a cat and is complete."
# prompt = "Write a Python program that prints Hello. Answer short."

# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
def prompt_to_code(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            # {"role": "user", "content": "Who won the world series in 2020?"},
            # {"role": "assistant",
            #     "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": prompt}
        ]
    )

    text = response['choices'][0]['message']['content']
    reg = re.search("```\w*(.*)```", text, re.DOTALL)
    # print("\n----------------------------\nCHATGPT TEXT:\n----------------------------\n")
    # print(text)
    # print("\n----------------------------\nTRIMMED TEXT:\n----------------------------\n")
    # f = open("test.svg", "a")
    # f.write(reg.group(1))
    # f.close()
    return base64.b64encode(reg.group(1).encode("ascii"))

print(prompt_to_code(prompt1))
