from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dropout, Flatten, Dense
from PIL import Image
from flask_cors import CORS, cross_origin
import tensorflow as tf
import numpy as np

import flask
import requests
import os
import io
import time

# initialize our Flask application and the Keras model
app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
model = None


def load_model():
  # load the pre-trained Keras model (here we are using a model
  # pre-trained on ImageNet and provided by Keras, but you can
  # substitute in your own networks just as easily)
  global model
  # build the network
  base_model = tf.keras.applications.resnet50.ResNet50(
      include_top=False, weights=None, input_shape=(224, 224, 3))

  # build a classifier model to put on top of the convolutional model
  top_model = Sequential()
  top_model.add(Flatten(input_shape=base_model.output_shape[1:]))
  top_model.add(Dense(1000, activation='relu'))
  top_model.add(Dropout(0.5))
  top_model.add(Dense(1000, activation='relu'))
  top_model.add(Dropout(0.5))
  top_model.add(Dense(4, activation='softmax'))

  model = Model(inputs=base_model.input, outputs=top_model(base_model.output))
  model.load_weights('/home/itsslabuw/server/ResNet_trainAll_May.h5')
  # model = tf.keras.models.load_model('./keras_model.h5')
  model._make_predict_function()


def prepare_image(image):
  # if the image mode is not RGB, convert it
  if image.mode != "RGB":
    image = image.convert("RGB")

  # resize the input image and preprocess it
  image = image.resize((224, 224))
  image = img_to_array(image) / 255
  image = np.expand_dims(image, axis=0)
  # return the processed image
  return image


@app.route("/predict", methods=["POST"])
@cross_origin()
def predict():
  # initialize the data dictionary that will be returned from the
  # view
  data = {"success": False}

  # ensure an image was properly uploaded to our endpoint
  if flask.request.method == "POST":
    print(flask.request.form, flask.request.args)
    if flask.request.form.get('image_url'):
      image_url = flask.request.form.get('image_url')
      image_name = image_url.split('/')[-1] + '_' + str(int(time.time()))
      image_path = f'/home/itsslabuw/server/images/{image_name}.jpg'
      r = requests.get(image_url)
      with open(image_path, 'wb') as f:
        f.write(r.content)
      image = Image.open(image_path)
      image = prepare_image(image)

      # classify the input image and then initialize the list
      # of predictions to return to the client
      preds = model.predict(image)
      print(preds)
      data["predictions"] = preds.tolist()
      data["success"] = True

    elif flask.request.files.get("image"):
      # read the image in PIL format
      image_file = flask.request.files["image"]
      image_name = image_file.filename
      image = image_file.read()
      image = Image.open(io.BytesIO(image))
      image_name = str(int(time.time()))
      image_path = f'/home/itsslabuw/server/images/user_{image_name}.jpg'
      image.save(image_path)

      # preprocess the image and prepare it for classification
      image = prepare_image(image)

      # classify the input image and then initialize the list
      # of predictions to return to the client
      preds = model.predict(image)
      print(preds)
      data["predictions"] = preds.tolist()

      # loop over the results and add them to the list of
      # returned predictions
      # for (imagenetID, label, prob) in results[0]:
      #   r = {"label": label, "probability": float(prob)}
      #   data["predictions"].append(r)

      # indicate that the request was a success
      data["success"] = True

  # return the data dictionary as a JSON response
  return flask.jsonify(data)


# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
  print('Loading Keras model and starting server...')
  load_model()
  app.run(host='0.0.0.0')
  #app.run(host= '0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'))

