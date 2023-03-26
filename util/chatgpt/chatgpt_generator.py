import openai
import re
import base64

openai.api_key = "85e3ba53e7a94f999e0d602b6a1775da"
openai.api_base = "https://azure-openai-hackathon-accessability.openai.azure.com/"
openai.api_type = 'azure'
openai.api_version = '2022-12-01'
deployment_name = 'azure-openai-davinci'

# Pass a prompt containing an enumeration of keywords.
def prompt_to_code(prompt):
    initial_prompt = "I would like you to act as an SVG designer. I will ask you to \
        create images, and you will come up with SVG code for the image and give me \
        a response that contains only a code block with that SVG code. Send only the \
        code block, so no text. The first line of code should contain \
        `xmlns=\"http://www.w3.org/2000/svg\".\
        \
        I will give you a prompt with a short description of the final image.\
        You will write the SVG code that generates an image of the description \
        I wrote. The image should follow the guidelines of a tactile image. Use curves \
        for the image, not just simple shapes.\
        \
        My request is: "
    built_in_keywords = "outline, clipart, detailed"
    full_prompt = initial_prompt + prompt + ", " + built_in_keywords

    response = openai.Completion.create(
        engine=deployment_name,
        prompt=full_prompt,
        temperature=1,
        max_tokens=1024
    )
    text = response['choices'][0]['text']
    reg = re.search("(<svg.*svg>)", text, re.DOTALL)

    return base64.b64encode(reg.group(1).encode("ascii"))

user_prompt = "cat, side view"
print(prompt_to_code(user_prompt))
