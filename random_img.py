import os
import json
from datetime import date, timedelta
import random

# specify your path
path = r'Fotos_2'

# get list of all files
files = os.listdir(path)
random.shuffle(files)  # Shuffle the files list to randomize the order

# start date
start_date = date(2024, 1, 23)

# create list to hold data
data = []

# loop over all files
for i, file in enumerate(files):
    # get the extension
    ext = os.path.splitext(file)[1]
    
    # check if the file is an image
    if ext.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.heic']:
        # TODO: Convert '.heic' files to '.jpg' here before proceeding
        
        # create dict for this file
        file_data = {
            "path": os.path.join(path, file),
            "date": str(start_date + timedelta(days=i))
        }
        
        # add dict to list
        data.append(file_data)

# write data to JSON file
with open('photos.json', 'w') as f:
    json.dump(data, f, indent=4)
