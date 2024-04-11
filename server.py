from flask import Flask, request, jsonify, render_template
from PIL import Image
from code1 import detect

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/detect', methods=['POST'])
def predict():
    file = request.files.get('image', '')
    # Read the image via file.stream
    img = Image.open(file)
    result = detect(img)

    return jsonify({'result':result})





if __name__ == '__main__':
    app.run()