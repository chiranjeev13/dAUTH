from ai import extractor
from flask import Flask, request

app = Flask(__name__)

@app.route('/image_reader/', methods=['GET', 'POST'])
def image_reader():
    image = request.files.get('image', '')
    return extractor(image)

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=3000)
