from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import openai
import os

app = Flask(__name__)

CORS(app, origins=["https://*.deeptrain.net", "https://40code.com", "https://www.40code.com"])

api = Api(app)
openai.api_key = os.environ.get('TOKEN')


def generate_text(prompt):
    try:
        completions = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )

        return completions.choices[0].message.content
    except AttributeError:
        return "OpenAI账号已经欠费！请尝试联系zmh-program或者捐赠！"


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
