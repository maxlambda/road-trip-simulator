# You will need your own Google API key to use this.
# This script will fetch Google Street View images based on a given locations
# text file. In step 2, you should haveg generated a list of locations. Paste that
# list there. Or, you could test this out using the given sample locations pre-filled in
# locations.txt. The sample locations run from Toronto's South core to The Beaches to
# Taylor Creek Park to Casa Loma.

import json
import os
import urllib.request

__dirname = os.path.dirname(os.path.realpath(__file__))
data = []

locationsFile = ''
imgFolder = ''
apiKey = ''

# Get user config
with open(__dirname + '/config.json') as f:
    configFile = json.load(f)
    locationsFile = __dirname + '/' + configFile["locationsFile"] # get path to locations.txt
    imgFolder = __dirname + '/' + configFile["streetImagesDir"] # directory to save photos in
    apiKey = configFile["apiKey"]

# Make the directory (and path to dir if necessary) of images if it doesn't already exist yet
if not os.path.exists(imgFolder):
    os.makedirs(imgFolder)

# Fetch and store location data (lng, lat, etc.) line-by-line
with open(locationsFile) as f:
    data = f.readlines()

# Fetch the images
for i in range(len(data)):
    imageData = (data[i]).strip().split(',')
    try:
        imageUrl = "https://maps.googleapis.com/maps/api/streetview?size=640x640&location=" + imageData[0] + "," + imageData[1] + "&heading=" + imageData[2] + "&pitch=20&key=" + apiKey
        urllib.request.urlretrieve(imageUrl, imgFolder + '/' + str(i) + '.jpg')
    except:
        print("Error: could not fetch image.")