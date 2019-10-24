import aiohttp
import asyncio
import json
import os

def createFolder(path):
    if not os.path.exists(path):
        os.makedirs(path)

async def fetch_image_by_id(url, img_id):
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(verify_ssl=False)) as session:
        async with session.get(url) as response:
            try:
                image_data = await response.content.read()
            except Exception as e:
                print(f'Download failed - {url}', e)
                return
            save_folder = './Snapshot/'    
            createFolder(f'{save_folder}/')            
            with open(f'{save_folder}{img_id}.jpg', 'wb') as f:
                f.write(image_data)
            print(f'Download complete - {img_id}.jpg')

async def fetch_all_images():
    sem = asyncio.Semaphore(10)
    with open('./camera.json', 'r') as f:
        cameras = json.load(f)
    print(f'total {len(cameras)} cameras')
    for camera in cameras:
        url = camera['Url']
        camera_id = url.split('/')[-1]
        async with sem:
            await fetch_image_by_id(url, camera_id)

def main():
    event_loop = asyncio.get_event_loop()
    future = asyncio.ensure_future(fetch_all_images())
    results = event_loop.run_until_complete(future)

if __name__ == '__main__':
    main()
