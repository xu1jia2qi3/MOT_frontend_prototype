import flask 
import redis
import datetime
import pickle

app = flask.Flask(__name__)
db = redis.Redis(host="localhost", port=6379)


    
@app.route("/")
def get_predict():
  data = {}
  for name in db.scan_iter():
    read_dict = db.get(name)
    yourdict = pickle.loads(read_dict)
    data[str(name).replace("b", "").replace("'","")] = yourdict      
  return data

          

if __name__ == "__main__":
  app.run(debug=True)