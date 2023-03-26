import base64
import re

import openai

from text2touch import settings


class GPT3Service:
    @staticmethod
    def generate(prompt):
        # set OpenAI API key
        openai.api_key = settings.OPENAI['API_KEY']

        # call GPT-3 to generate SVG images
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant.",
                },
                {
                    "role": "user",
                    "content": "Generate SVG code for {}. Output no additional explanations. I repeat, give me SVG code.".format(prompt),
                },
            ],
        )

        text = response['choices'][0]['message']['content']
        print(text)
        svg = re.search("```\w*\n(.*)```", text, re.DOTALL).group(1)

        return [base64.b64encode(svg.encode()).decode()]
