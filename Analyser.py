import requests
from pathlib import Path

ans = {}

# read all files from snapshots, may need update for future if more pics in one folder
folders = Path('./Snapshot/')
for folder in folders.iterdir():
    files = Path(f'./{folder}/')
    for file in files.iterdir():        
        print(file.name)




# if __name__ == '__main__':
#     url = 'http://35.185.8.182:5000/predict'


#     files = {'media': open('test.jpg', 'rb')}


#     requests.post(url, files=files)