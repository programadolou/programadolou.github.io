import os
import json
from datetime import date, timedelta

# specify your path
path = r'imagens'

# get list of all files
files = os.listdir(path)

# start date
start_date = date(2023, 6, 9)

# create list to hold data
data = []

# loop over all files
for i, file in enumerate(files, 1):
    # get the extension
    ext = os.path.splitext(file)[1]
    
    # check if the file is an image
    if ext.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.bmp']:
        # create dict for this file
        file_data = {
            "path": f"imagens/{file}",
            "date": str(start_date)
        }
        
        # add dict to list
        data.append(file_data)
        
        # increment the date
        start_date += timedelta(days=1)

# write data to JSON file
with open('photos.json', 'w') as f:
    json.dump(data, f, indent=4)
