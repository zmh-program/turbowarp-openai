from flask import Flask, request

from flask_restful import Resource, Api

from flask_cors import CORS

import openai

import os

app = Flask(__name__)

CORS(app, origins=["https://40code.com", "https://www.40code.com"])

api = Api(app)

# Set up OpenAI API credentials

openai.api_key = os.environ.get('TOKEN')

# Define a function to call OpenAI API

def generate_text(prompt):

    try:

        completions = openai.Completion.create(

            engine="curie",

            prompt=prompt,

            max_tokens=260,

            n=1,

            stop=None,

            temperature=0.7,

        )

    except AttributeError:

        return "OpenAI账号已经欠费！请尝试联系zmh-program或者捐赠！"

    message = completions.choices[0].text

    return message

  
class GPT3(Resource):
    def get(self):
        prompt = request.args.get('data').strip()
        return {'message': generate_text(prompt) if prompt else '无结果'}

    
    def post(self):
        data = request.get_json(force=True)
        prompt = data.get('data', '').strip()
        return {'message': generate_text(prompt) if prompt else '无结果'}

api.add_resource(GPT3, '/gpt')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=81)

