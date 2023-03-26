import base64
import re

import openai


class GPT3Service:
    @staticmethod
    def generate(prompt, pov):
        # set OpenAI API key
        openai.api_key = "85e3ba53e7a94f999e0d602b6a1775da"
        openai.api_base = "https://azure-openai-hackathon-accessability.openai.azure.com/"
        openai.api_type = 'azure'
        openai.api_version = '2022-12-01'

        # prepare the full prompt
        full_prompt = "I would like you to act as an SVG designer. I will ask you \
        to create images, and you will come up with SVG code for the image and give \
        me a response that contains only a code block with that SVG code. The first \
        line of code should contain `xmlns=\"http://www.w3.org/2000/svg\".\
        \
        I will give you a prompt with a short description of the final image. You will \
        write the SVG code that generates an image of the object I describe. The image \
        should be a detailed contour of the object, black and white, in clipart style. \
        The code should be clearly separable into components. The image should follow \
        the guidelines of a tactile image. Use curves for the image, not just simple shapes. \
        The code should have at least 30 lines. Explain the code with comments.\
        \
        My request is: Generate a black and white, clipart style, detailed {} outline of a {}.".format(pov, prompt)

        # call GPT-3 to generate SVG images
        response = openai.Completion.create(
            engine='azure-openai-davinci',
            prompt=full_prompt,
            temperature=1,
            max_tokens=1024
        )
        text = response['choices'][0]['text']
        svg = re.search("(<svg.*svg>)", text, re.DOTALL).group(1)

        return [base64.b64encode(svg.encode()).decode()]
